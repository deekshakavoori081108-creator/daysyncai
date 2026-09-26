import { Router } from 'express';
import { db } from '../db/index.js';

const router = Router();

// GET /api/export/:id/json - Full structured JSON export
router.get('/:id/json', async (req, res) => {
  try {
    const game = await db.getGameById(req.params.id);
    if (!game) {
      return res.status(404).json({ success: false, error: 'Game not found' });
    }

    const exportPackage = {
      project: "SanskritiPlay - Cultural Heritage Toy & Game Studio",
      exportedAt: new Date().toISOString(),
      schemaVersion: "1.0",
      gameData: game
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${game.title.replace(/[^a-zA-Z0-9]/g, '_')}_blueprint.json"`);
    res.send(JSON.stringify(exportPackage, null, 2));
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/export/:id/stl-manifest - 3D Printing manifest & fabrication guide
router.get('/:id/stl-manifest', async (req, res) => {
  try {
    const game = await db.getGameById(req.params.id);
    if (!game) {
      return res.status(404).json({ success: false, error: 'Game not found' });
    }

    const blueprint = game.fabricationBlueprint || {
      primaryFabricationMethod: "3D Printing (FDM / SLA)",
      recommendedFilamentOrStock: "PLA / Wood-Fill",
      totalEstimatedWeightGrams: 200,
      estimatedPrintTimeHours: 5,
      estimatedManufacturingCostUsd: 8.0,
      assemblyInstructions: ["Fabricate parts according to specifications."],
      stlPartFilesSuggested: []
    };

    res.json({
      success: true,
      title: game.title,
      civilization: game.civilization,
      blueprint
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
