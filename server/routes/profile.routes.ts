import { Router, Response } from 'express';
import { userRepo } from '../repositories/user.repository';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { ProfileSchema } from '../../shared/schemas/index';

const router = Router();

// GET /api/profile
router.get('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const user = await userRepo.findById(userId);
    const prefs = await userRepo.getPreferences(userId);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        timezone: user.timezone,
        preferences: prefs
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/profile
router.patch('/', requireAuth, validateBody(ProfileSchema.partial()), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { name, wakeTime, typicalSleepMinutes, workOrStudy, destination, typicalCommuteMinutes, preferredDepartureBufferMinutes, morningStyle } = req.body;

    if (name) {
      await userRepo.updateProfile(userId, { name });
    }

    const updatedPrefs = await userRepo.updatePreferences(userId, {
      wake_time: wakeTime,
      typical_sleep_minutes: typicalSleepMinutes,
      work_or_study: workOrStudy,
      destination,
      typical_commute_minutes: typicalCommuteMinutes,
      preferred_departure_buffer_minutes: preferredDepartureBufferMinutes,
      morning_style: morningStyle
    });

    res.json({
      success: true,
      message: 'Profile and preferences updated successfully.',
      data: updatedPrefs
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
