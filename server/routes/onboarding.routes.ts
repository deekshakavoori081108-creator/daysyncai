import { Router, Response } from 'express';
import { userRepo } from '../repositories/user.repository';
import { routineRepo } from '../repositories/routine.repository';
import { morningEngine } from '../services/morningEngine.service';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { OnboardingSchema } from '../../shared/schemas/index';

const router = Router();

// GET /api/onboarding - Check status
router.get('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const prefs = await userRepo.getPreferences(req.user!.userId);
    res.json({
      success: true,
      data: {
        completed: prefs?.onboarding_completed || false,
        preferences: prefs
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/onboarding - Save onboarding flow & initial routine
router.post('/', requireAuth, validateBody(OnboardingSchema), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const {
      name,
      wakeTime,
      typicalSleepMinutes,
      workOrStudy,
      destination,
      typicalCommuteMinutes,
      preferredDepartureBufferMinutes,
      morningStyle,
      initialTasks
    } = req.body;

    // 1. Update Profile & Preferences
    await userRepo.updateProfile(userId, { name });
    const updatedPrefs = await userRepo.updatePreferences(userId, {
      wake_time: wakeTime,
      typical_sleep_minutes: typicalSleepMinutes,
      work_or_study: workOrStudy,
      destination,
      typical_commute_minutes: typicalCommuteMinutes,
      preferred_departure_buffer_minutes: preferredDepartureBufferMinutes,
      morning_style: morningStyle,
      onboarding_completed: true
    });

    // 2. Create Initial Routine Tasks
    for (let i = 0; i < initialTasks.length; i++) {
      const task = initialTasks[i];
      await routineRepo.createTask(userId, {
        name: task.name,
        category: task.category,
        duration_minutes: task.durationMinutes,
        priority: task.priority,
        flexibility: task.flexibility,
        ai_behavior: task.aiBehavior,
        preferred_start_time: task.preferredStartTime || null,
        active_days: task.activeDays || [1, 2, 3, 4, 5],
        sort_order: i + 1,
        is_active: task.isActive !== undefined ? task.isActive : true
      });
    }

    // 3. Generate First Adaptive Morning Plan
    const initialPlan = await morningEngine.getOrGenerateTodayPlan(userId, { forceRecalculate: true });

    res.status(201).json({
      success: true,
      message: 'Onboarding completed successfully! First morning plan generated.',
      data: {
        preferences: updatedPrefs,
        plan: initialPlan.plan
      }
    });
  } catch (err: any) {
    console.error('[Onboarding Route] Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
