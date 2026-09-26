import { Router, Response } from 'express';
import { morningRepo } from '../repositories/morning.repository';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';

const router = Router();

// GET /api/morning/history
router.get('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const limit = Number(req.query.limit) || 30;
    const offset = Number(req.query.offset) || 0;

    const history = await morningRepo.getHistory(userId, limit, offset);

    res.json({
      success: true,
      data: history.sessions,
      pagination: {
        total: history.total,
        limit,
        offset
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/morning/history/:date
router.get('/:date', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const dateStr = req.params.date;

    const sessionDetail = await morningRepo.getSessionByDate(userId, dateStr);
    if (!sessionDetail) {
      return res.status(404).json({ success: false, error: 'Session not found for this date.' });
    }

    res.json({
      success: true,
      data: sessionDetail
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
