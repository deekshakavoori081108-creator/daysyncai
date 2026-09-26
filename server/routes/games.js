import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { gameConceptSchema } from '../../shared/schema.js';

const router = Router();

// GET /api/games - Fetch public games with search, filter, and pagination
router.get('/', async (req, res) => {
  try {
    const { civilization, category, ageGroup, search, sort, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const result = await db.getAllGames({
      civilization,
      category,
      ageGroup,
      search,
      sort,
      isPublic: true,
      limit: Number(limit),
      offset
    });

    res.json({
      success: true,
      data: result.games,
      pagination: {
        total: result.total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(result.total / Number(limit))
      }
    });
  } catch (err) {
    console.error('[API] Error in GET /api/games:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/games/:id - Fetch single game concept
router.get('/:id', async (req, res) => {
  try {
    const game = await db.getGameById(req.params.id);
    if (!game) {
      return res.status(404).json({ success: false, error: 'Game concept not found' });
    }
    res.json({ success: true, data: game });
  } catch (err) {
    console.error('[API] Error in GET /api/games/:id:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/games - Save a new game concept
router.post('/', async (req, res) => {
  try {
    const gameData = {
      ...req.body,
      userId: req.user?.id || 1,
      authorName: req.body.authorName || req.user?.username || 'Student Innovator'
    };

    const savedGame = await db.createGame(gameData);
    res.status(201).json({
      success: true,
      message: 'Game concept successfully saved to SanskritiPlay studio.',
      data: savedGame
    });
  } catch (err) {
    console.error('[API] Error in POST /api/games:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/games/:id - Update existing game concept
router.put('/:id', async (req, res) => {
  try {
    const updated = await db.updateGame(req.params.id, req.body, req.user?.id || 1);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Game concept not found' });
    }
    res.json({
      success: true,
      message: 'Game concept updated successfully.',
      data: updated
    });
  } catch (err) {
    console.error('[API] Error in PUT /api/games/:id:', err);
    const status = err.status || 500;
    res.status(status).json({ success: false, error: err.message });
  }
});

// DELETE /api/games/:id - Delete owned game concept
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await db.deleteGame(req.params.id, req.user?.id || 1);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Game concept not found' });
    }
    res.json({ success: true, message: 'Game concept removed successfully.' });
  } catch (err) {
    console.error('[API] Error in DELETE /api/games/:id:', err);
    const status = err.status || 500;
    res.status(status).json({ success: false, error: err.message });
  }
});

// POST /api/games/:id/like - Like a game concept
router.post('/:id/like', async (req, res) => {
  try {
    const result = await db.likeGame(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, error: 'Game not found' });
    }
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/games/:id/fork - Fork game to studio
router.post('/:id/fork', async (req, res) => {
  try {
    const forked = await db.forkGame(req.params.id, req.user?.id || 1, req.user?.username || 'Student Remixer');
    if (!forked) {
      return res.status(404).json({ success: false, error: 'Source game not found' });
    }
    res.json({
      success: true,
      message: 'Game successfully cloned into your studio workspace!',
      data: forked
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
