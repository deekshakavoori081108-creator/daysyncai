import { Router, Response } from 'express';
import { weatherProvider } from '../providers/weather.provider';
import { calendarProvider } from '../providers/calendar.provider';
import { trafficProvider } from '../providers/traffic.provider';
import { userRepo } from '../repositories/user.repository';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';

const router = Router();

// GET /api/context/weather
router.get('/weather', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const prefs = await userRepo.getPreferences(userId);
    const weather = await weatherProvider.getWeather(prefs?.destination);

    res.json({ success: true, data: weather });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/context/calendar
router.get('/calendar', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const targetDate = req.query.date ? new Date(req.query.date as string) : new Date();
    const events = await calendarProvider.getEventsForDate(userId, targetDate);

    res.json({ success: true, data: events });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/context/traffic
router.get('/traffic', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const prefs = await userRepo.getPreferences(userId);
    const traffic = await trafficProvider.getTrafficInfo(
      'Home',
      prefs?.destination || 'Workplace',
      prefs?.typical_commute_minutes || 30
    );

    res.json({ success: true, data: traffic });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
