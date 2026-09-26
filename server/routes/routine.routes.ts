import { Router, Response } from 'express';
import { routineRepo } from '../repositories/routine.repository';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { RoutineTaskSchema, RoutineTaskUpdateSchema } from '../../shared/schemas/index';
import { z } from 'zod';

const router = Router();

// GET /api/routine
router.get('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const tasks = await routineRepo.getTasksByUserId(userId);

    const totalMinutes = tasks.filter(t => t.is_active).reduce((sum, t) => sum + t.duration_minutes, 0);
    const criticalMinutes = tasks
      .filter(t => t.is_active && (t.priority === 'CRITICAL' || t.ai_behavior === 'NEVER_REMOVE'))
      .reduce((sum, t) => sum + t.duration_minutes, 0);

    res.json({
      success: true,
      data: {
        tasks,
        summary: {
          totalTasks: tasks.length,
          activeTasks: tasks.filter(t => t.is_active).length,
          totalDurationMinutes: totalMinutes,
          criticalDurationMinutes: criticalMinutes
        }
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/routine/tasks
router.post('/tasks', requireAuth, validateBody(RoutineTaskSchema), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const created = await routineRepo.createTask(userId, req.body);

    res.status(201).json({
      success: true,
      message: 'Routine task added successfully',
      data: created
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/routine/tasks/:id
router.patch('/tasks/:id', requireAuth, validateBody(RoutineTaskUpdateSchema), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const taskId = req.params.id;

    const updated = await routineRepo.updateTask(taskId, userId, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Task not found or access denied.' });
    }

    res.json({
      success: true,
      message: 'Routine task updated successfully',
      data: updated
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/routine/tasks/:id
router.delete('/tasks/:id', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const taskId = req.params.id;

    const deleted = await routineRepo.deleteTask(taskId, userId);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Task not found or access denied.' });
    }

    res.json({ success: true, message: 'Routine task removed successfully.' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/routine/reorder
const ReorderSchema = z.object({
  taskIds: z.array(z.string())
});

router.post('/reorder', requireAuth, validateBody(ReorderSchema), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const updated = await routineRepo.reorderTasks(userId, req.body.taskIds);

    res.json({
      success: true,
      message: 'Routine order updated successfully',
      data: updated
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
