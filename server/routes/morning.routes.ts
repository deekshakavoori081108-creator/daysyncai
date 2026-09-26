import { Router, Response } from 'express';
import { morningEngine } from '../services/morningEngine.service';
import { morningRepo } from '../repositories/morning.repository';
import { dnaEngine } from '../services/dnaEngine.service';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { aiRateLimiter } from '../middleware/rateLimiter.middleware';
import { MorningGenerateSchema } from '../../shared/schemas/index';
import { z } from 'zod';

const router = Router();

// GET /api/morning/today
router.get('/today', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const planResult = await morningEngine.getOrGenerateTodayPlan(userId, { forceRecalculate: false });

    res.json({
      success: true,
      data: planResult
    });
  } catch (err: any) {
    console.error('[Morning Route] Error in /today:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/morning/generate
router.post('/generate', requireAuth, validateBody(MorningGenerateSchema), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const planResult = await morningEngine.getOrGenerateTodayPlan(userId, {
      forceRecalculate: true,
      customWakeTime: req.body.customWakeTime,
      forceMode: req.body.forceMode,
      sleepMinutes: req.body.sleepMinutes
    });

    res.json({
      success: true,
      message: 'Morning plan generated successfully.',
      data: planResult
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/morning/recalculate - Prominent "Recalculate My Morning" Action
router.post('/recalculate', requireAuth, aiRateLimiter, validateBody(MorningGenerateSchema), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const planResult = await morningEngine.getOrGenerateTodayPlan(userId, {
      forceRecalculate: true,
      customWakeTime: req.body.customWakeTime,
      forceMode: req.body.forceMode,
      sleepMinutes: req.body.sleepMinutes
    });

    // Recalculate Morning DNA in the background
    dnaEngine.recalculateUserDNA(userId).catch(e => console.warn('[DNA Background Update Error]:', e.message));

    res.json({
      success: true,
      message: 'Morning timeline dynamically adapted and recalculated.',
      data: planResult
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/morning/tasks/:id/start
router.post('/tasks/:id/start', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const taskId = req.params.id;
    const now = new Date().toISOString();

    const updated = await morningRepo.updateTaskStatus(taskId, userId, {
      status: 'IN_PROGRESS',
      actual_start_at: now
    });

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Task not found.' });
    }

    await morningRepo.logBehaviorEvent(userId, {
      user_id: userId,
      session_id: updated.session_id,
      task_id: taskId,
      event_type: 'TASK_STARTED',
      event_data: { taskName: updated.name, startTime: now }
    });

    res.json({ success: true, message: 'Task marked as in progress', data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/morning/tasks/:id/complete
const CompleteTaskSchema = z.object({
  actualDurationMinutes: z.number().int().min(1).max(180).optional()
});

router.post('/tasks/:id/complete', requireAuth, validateBody(CompleteTaskSchema), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const taskId = req.params.id;
    const now = new Date().toISOString();

    const task = await morningRepo.updateTaskStatus(taskId, userId, {
      status: 'COMPLETED',
      actual_end_at: now,
      actual_duration_minutes: req.body.actualDurationMinutes || undefined
    });

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found.' });
    }

    await morningRepo.logBehaviorEvent(userId, {
      user_id: userId,
      session_id: task.session_id,
      task_id: taskId,
      event_type: 'TASK_COMPLETED',
      event_data: {
        taskName: task.name,
        actualDuration: task.actual_duration_minutes || task.planned_duration_minutes
      }
    });

    res.json({ success: true, message: 'Task completed!', data: task });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/morning/tasks/:id/skip
const SkipTaskSchema = z.object({
  reason: z.string().optional()
});

router.post('/tasks/:id/skip', requireAuth, validateBody(SkipTaskSchema), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const taskId = req.params.id;

    const task = await morningRepo.updateTaskStatus(taskId, userId, {
      status: 'SKIPPED'
    });

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found.' });
    }

    await morningRepo.logBehaviorEvent(userId, {
      user_id: userId,
      session_id: task.session_id,
      task_id: taskId,
      event_type: 'TASK_SKIPPED',
      event_data: { taskName: task.name, reason: req.body.reason || 'User skipped' }
    });

    res.json({ success: true, message: 'Task skipped and recorded in Morning DNA', data: task });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/morning/tasks/:id/reset
router.post('/tasks/:id/reset', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const taskId = req.params.id;

    const task = await morningRepo.updateTaskStatus(taskId, userId, {
      status: 'PENDING',
      actual_start_at: null,
      actual_end_at: null,
      actual_duration_minutes: null
    });

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found.' });
    }

    res.json({ success: true, message: 'Task status reset to pending', data: task });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
