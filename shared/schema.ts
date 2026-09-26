import { z } from 'zod';

export const CivilizationsList = [
  'Ancient Mesopotamia',
  'Indus Valley (Harappan)',
  'Vedic & Ancient India',
  'Ancient Egypt',
  'Classical Greece & Rome',
  'Mesoamerica (Maya & Aztec)',
  'Han Dynasty & Ancient China',
  'Nordic & Viking Era',
  'West African Kingdoms (Mali, Yoruba, Ghana)',
  'Persian Empire (Achaemenid)',
  'Inca Empire & Andean Cultures'
] as const;

export const GameCategoriesList = [
  'Board Game',
  'Card Game',
  'Physical Toy',
  'Strategy Game',
  'Puzzle & Dexterity'
] as const;

export const AgeGroupsList = ['5-8', '9-12', '13+', 'All Ages'] as const;

export const ComplexityLevelsList = ['Beginner', 'Intermediate', 'Advanced Strategy'] as const;

export const MaterialConstraintsList = [
  'Wood & Laser Cut Timber',
  'Paper, Cardboard & Cardstock',
  '3D Print (PLA / Wood-Fill)',
  'Terracotta Clay & Ceramic',
  'Recycled & Organic Materials',
  'Hybrid Multi-Material'
] as const;

export const EducationalPillarsList = [
  'History & Archaeological Evidence',
  'Strategic Thinking & Probability',
  'Material Science & Craftsmanship',
  'Cultural Anthropology & Folklore',
  'Civic Systems & Ancient Trade'
] as const;

// 1. Zod input schema for AI Game Generation
export const generateGameSchema = z.object({
  civilization: z.string().min(2).max(100),
  category: z.enum(['Board Game', 'Card Game', 'Physical Toy', 'Strategy Game', 'Puzzle', 'Puzzle & Dexterity']),
  ageGroup: z.enum(['5-8', '9-12', '13+', 'All Ages']),
  theme: z.string().min(3).max(300),
  complexity: z.enum(['Beginner', 'Intermediate', 'Advanced Strategy']).optional().default('Intermediate'),
  materialConstraint: z.string().optional().default('Wood & Laser Cut Timber'),
  playerCount: z.string().optional().default('2-4 Players'),
  duration: z.string().optional().default('20-45 mins'),
  archaeologicalInspiration: z.string().optional().default('')
});

export type GenerateGameInput = z.infer<typeof generateGameSchema>;

// Component Schema
export const componentItemSchema = z.object({
  name: z.string(),
  quantity: z.number().int().positive(),
  material: z.string(),
  description: z.string(),
  dimensions: z.string().optional(),
  fabricationMethod: z.string().optional(), // '3D Print (STL)', 'Laser Cut', 'Cardstock Print', 'Clay Mold'
  estimatedUnitCostUsd: z.number().optional()
});

export type ComponentItem = z.infer<typeof componentItemSchema>;

// Ruleset Schema
export const rulesetSchema = z.object({
  setup: z.string(),
  objective: z.string(),
  turnStructure: z.array(z.string()),
  winningConditions: z.string(),
  specialRules: z.array(z.string()).optional(),
  historicalMechanicNote: z.string().optional()
});

export type Ruleset = z.infer<typeof rulesetSchema>;

// Layout & Board Config Schema for 2D/3D Playtesting & Blueprints
export const layoutConfigSchema = z.object({
  boardType: z.enum(['grid', 'track', 'radial', 'hex', 'modular_tiles', 'dexterity_arena', 'card_tableau']),
  gridDimensions: z.object({
    rows: z.number(),
    cols: z.number()
  }).optional(),
  tiles: z.array(z.object({
    id: z.string(),
    label: z.string(),
    x: z.number(),
    y: z.number(),
    type: z.string(), // 'start', 'goal', 'hazard', 'rosette', 'sanctuary', 'portal', 'resource'
    historicalSignificance: z.string().optional(),
    color: z.string().optional()
  })).optional(),
  pieces: z.array(z.object({
    id: z.string(),
    name: z.string(),
    player: z.number(),
    startX: z.number(),
    startY: z.number(),
    currentX: z.number().optional(),
    currentY: z.number().optional(),
    icon: z.string().optional(),
    color: z.string().optional()
  })).optional(),
  diceType: z.enum(['d4', 'd6', 'tetrahedral', 'cowrie_shells', 'astragaloi', 'binary_sticks', 'custom_spinner']).optional(),
  diceCount: z.number().optional().default(1),
  specialSpaces: z.array(z.object({
    position: z.string(),
    effect: z.string()
  })).optional()
});

export type LayoutConfig = z.infer<typeof layoutConfigSchema>;

// 3D Fabrication Blueprint Specification
export const fabricationBlueprintSchema = z.object({
  primaryFabricationMethod: z.string(),
  recommendedFilamentOrStock: z.string(),
  totalEstimatedWeightGrams: z.number(),
  estimatedPrintTimeHours: z.number(),
  estimatedManufacturingCostUsd: z.number(),
  tolerancesMm: z.number().optional(),
  assemblyInstructions: z.array(z.string()),
  stlPartFilesSuggested: z.array(z.object({
    partName: z.string(),
    dimensionsMm: z.string(),
    infillPercentage: z.number(),
    description: z.string()
  }))
});

export type FabricationBlueprint = z.infer<typeof fabricationBlueprintSchema>;

// Complete Game Concept Schema (Database & AI Output)
export const gameConceptSchema = z.object({
  id: z.number().optional(),
  userId: z.number().optional().nullable(),
  title: z.string().min(2).max(255),
  tagline: z.string().min(5).max(500),
  civilization: z.string().min(2).max(100),
  gameType: z.string().min(2).max(50),
  targetAge: z.string().min(1).max(20),
  complexity: z.string().optional().default('Intermediate'),
  historicalContext: z.string().min(20),
  archaeologicalCitations: z.array(z.string()).optional(),
  educationalObjectives: z.array(z.string()),
  culturalSensitivityScore: z.number().min(1).max(100).optional().default(98),
  components: z.array(componentItemSchema),
  ruleset: rulesetSchema,
  layoutConfig: layoutConfigSchema,
  fabricationBlueprint: fabricationBlueprintSchema.optional(),
  isPublic: z.boolean().optional().default(true),
  likesCount: z.number().optional().default(0),
  forkCount: z.number().optional().default(0),
  authorName: z.string().optional().default('Student Innovator'),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});

export type GameConcept = z.infer<typeof gameConceptSchema>;

// Playtest Step Input & Output Schema
export const playtestStepSchema = z.object({
  gameId: z.number().optional(),
  gameState: z.object({
    turnNumber: z.number(),
    activePlayer: z.number(),
    boardState: z.any(),
    piecePositions: z.record(z.any()),
    diceRoll: z.any().optional(),
    recentMove: z.string().optional()
  }),
  actionRequested: z.enum(['roll_dice', 'move_piece', 'validate_move', 'ai_opponent_turn', 'explain_historical_tactic', 'check_win_condition']),
  actionPayload: z.any().optional()
});

export type PlaytestStepInput = z.infer<typeof playtestStepSchema>;

// Game Review Schema
export const gameReviewSchema = z.object({
  id: z.number().optional(),
  gameId: z.number(),
  userId: z.number().optional().nullable(),
  authorName: z.string().optional().default('Educator & Playtester'),
  rating: z.number().int().min(1).max(5),
  feedback: z.string().min(5).max(1000),
  historicalAccuracyRating: z.number().int().min(1).max(5).optional().default(5),
  funFactorRating: z.number().int().min(1).max(5).optional().default(5),
  createdAt: z.string().optional()
});

export type GameReview = z.infer<typeof gameReviewSchema>;
