import { Router } from 'express';
import { db } from '../db/index.js';
import { validateBody } from '../middleware/validate.js';
import { gameReviewSchema } from '../../shared/schema.js';

const router = Router();

// GET /api/reviews/:gameId
router.get('/:gameId', async (req, res) => {
  try {
    const reviews = db.getReviewsForGame(req.params.gameId);
    res.json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/reviews - Submit review and rating
router.post('/', validateBody(gameReviewSchema), async (req, res) => {
  try {
    const reviewData = {
      ...req.validatedBody,
      userId: req.user?.id || 1,
      authorName: req.validatedBody.authorName || req.user?.username || 'Student Reviewer'
    };

    const newReview = await db.createReview(reviewData);
    res.status(201).json({
      success: true,
      message: 'Review successfully submitted.',
      data: newReview
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
