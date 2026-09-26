import { Router, Response } from 'express';
import { dnaRepo } from '../repositories/dna.repository';
import { dnaEngine } from '../services/dnaEngine.service';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';

const router = Router();

// GET /api/morning-dna
router.get('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    let dna = await dnaRepo.getByUserId(userId);

    if (!dna) {
      dna = await dnaEngine.recalculateUserDNA(userId) as any;
    }

    res.json({
      success: true,
      data: dna
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/morning-dna/recalculate
router.post('/recalculate', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const recalculated = await dnaEngine.recalculateUserDNA(userId);

    res.json({
      success: true,
      message: 'Morning DNA behavioral metrics updated from recent session history.',
      data: recalculated
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
