import { GoogleGenAI } from '@google/genai';
import { generateFallbackConcept } from './fallbackGenerator.js';

// Server-side initialization of Google Gemini AI
const apiKey = process.env.GEMINI_API_KEY || '';
let ai = null;

if (apiKey && apiKey.trim() !== '') {
  try {
    ai = new GoogleGenAI({ apiKey });
    console.log('[Gemini AI] Official @google/genai client successfully initialized with provided API key.');
  } catch (err) {
    console.warn('[Gemini AI] Initialization error, falling back to local cultural intelligence engine:', err.message);
  }
} else {
  console.log('[Gemini AI] No GEMINI_API_KEY detected in environment. Using high-fidelity Cultural Intelligence Fallback Engine.');
}

const SYSTEM_PROMPT = `You are an expert Cultural Historian, Master Board Game Designer, and Child Pedagogy Specialist. 
Your role is to take historical civilizations, cultural artifacts, and traditional folklore, and transform them into engaging, educational, and fun toys or board games for youth. 
You MUST output strictly valid JSON conforming to the requested schema. Ensure all historical information is verified, respectful, and educational.`;

const JSON_SCHEMA_PROMPT = `
Output MUST be a valid JSON object strictly adhering to this structure:
{
  "title": "A captivating, evocative title for the game or toy",
  "tagline": "A punchy, informative 1-line summary highlighting its historical and gameplay hook",
  "civilization": "The historical civilization",
  "gameType": "Category of game/toy",
  "targetAge": "Target age group",
  "complexity": "Beginner, Intermediate, or Advanced Strategy",
  "historicalContext": "2-3 rich paragraphs detailing archaeological findings, museum artifacts, historical significance, and real ancient play traditions",
  "archaeologicalCitations": ["Specific museum artifacts", "Excavation records", "Primary sources or scholarly publications"],
  "educationalObjectives": ["3-5 clear pedagogical outcomes across history, STEM, game theory, or craftsmanship"],
  "culturalSensitivityScore": 98,
  "components": [
    {
      "name": "Component name",
      "quantity": 1,
      "material": "Material recommendation (e.g. Wood, 3D PLA, Clay, Cardstock)",
      "description": "Tactile and visual details",
      "dimensions": "e.g. 280 x 200 x 15 mm",
      "fabricationMethod": "e.g. 3D Print (PLA), Laser Cut, Cardstock Print",
      "estimatedUnitCostUsd": 3.50
    }
  ],
  "ruleset": {
    "setup": "Step by step board and piece preparation",
    "objective": "Primary victory goal and cultural theme link",
    "turnStructure": [
      "Phase 1: Casting / Action selection",
      "Phase 2: Tactical Movement / Resource allocation",
      "Phase 3: Resolution & Cultural Event triggers"
    ],
    "winningConditions": "Clear, measurable condition for victory",
    "specialRules": ["2-3 nuanced rules or sanctuary mechanisms"],
    "historicalMechanicNote": "Why this game mechanic reflects real historical culture"
  },
  "layoutConfig": {
    "boardType": "track | grid | modular_tiles | radial | dexterity_arena",
    "gridDimensions": { "rows": 6, "cols": 6 },
    "diceType": "tetrahedral | d6 | cowrie_shells | binary_sticks | astragaloi",
    "diceCount": 2,
    "tiles": [
      { "id": "t1", "label": "Start Gateway", "x": 0, "y": 0, "type": "start", "color": "#C1A456" },
      { "id": "t2", "label": "Sanctuary", "x": 2, "y": 2, "type": "sanctuary", "color": "#70AFD2" },
      { "id": "t3", "label": "Goal", "x": 5, "y": 5, "type": "goal", "color": "#2A9D8F" }
    ],
    "pieces": [
      { "id": "p1", "name": "Guardian", "player": 1, "startX": 0, "startY": 0, "color": "#C85A32", "icon": "👑" },
      { "id": "p2", "name": "Seeker", "player": 2, "startX": 5, "startY": 0, "color": "#264653", "icon": "🦅" }
    ]
  },
  "fabricationBlueprint": {
    "primaryFabricationMethod": "3D Printing / Laser Cutting / Clay Molding",
    "recommendedFilamentOrStock": "Material and finish details",
    "totalEstimatedWeightGrams": 240,
    "estimatedPrintTimeHours": 5.0,
    "estimatedManufacturingCostUsd": 8.50,
    "tolerancesMm": 0.2,
    "assemblyInstructions": [
      "Step 1 fabrication instruction",
      "Step 2 assembly instruction",
      "Step 3 finishing & testing"
    ],
    "stlPartFilesSuggested": [
      { "partName": "Chassis.stl", "dimensionsMm": "250x180x15 mm", "infillPercentage": 15, "description": "Main base" },
      { "partName": "Tokens.stl", "dimensionsMm": "22x22x30 mm", "infillPercentage": 25, "description": "Playing pieces" }
    ]
  }
}
`;

export async function generateGameConceptAI(params) {
  const { civilization, category, ageGroup, theme, complexity = 'Intermediate', materialConstraint = 'Wood & Laser Cut Timber', archaeologicalInspiration = '' } = params;

  if (ai && process.env.GEMINI_API_KEY) {
    try {
      const userPrompt = `
Generate an original, culturally accurate toy or game concept based on:
Civilization: ${civilization}
Category: ${category}
Target Age: ${ageGroup}
Complexity Level: ${complexity}
Core Learning Theme: ${theme}
Material Preference: ${materialConstraint}
${archaeologicalInspiration ? `Archaeological Artifact Inspiration: ${archaeologicalInspiration}` : ''}

${JSON_SCHEMA_PROMPT}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\n${userPrompt}` }] }
        ],
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        }
      });

      const responseText = response.text;
      if (responseText) {
        const cleaned = responseText.replace(/```json\n?|\n?```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        console.log(`[Gemini AI] Successfully generated concept: "${parsed.title}"`);
        return parsed;
      }
    } catch (err) {
      console.warn('[Gemini AI] API call encountered error, engaging fallback generator:', err.message);
    }
  }

  // Graceful fallback
  return generateFallbackConcept(params);
}

export async function simulatePlaytestTurnAI(gameState, actionRequested, actionPayload) {
  if (ai && process.env.GEMINI_API_KEY) {
    try {
      const prompt = `
You are the AI Playtest Arbiter and Cultural Game Master.
Current Game State:
${JSON.stringify(gameState, null, 2)}

Player Action Requested: ${actionRequested}
Action Payload: ${JSON.stringify(actionPayload || {})}

Provide a tactical assessment and simulated turn resolution in JSON format:
{
  "valid": true,
  "turnLog": "Detailed description of what happened on the board",
  "historicalTacticExplanation": "Why this move reflects the military, spiritual, or civic tactics of the civilization",
  "recommendedNextMove": "Strategic guidance for the opponent or next turn",
  "diceRollResult": 3,
  "pieceMoved": { "id": "piece_id", "from": [0,0], "to": [0,3] },
  "gameEnded": false,
  "winner": null
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: { responseMimeType: 'application/json' }
      });

      const parsed = JSON.parse(response.text.replace(/```json\n?|\n?```/g, '').trim());
      return parsed;
    } catch (err) {
      console.warn('[Gemini AI] Playtest simulation fallback:', err.message);
    }
  }

  // Fallback Playtest Simulation
  const rolls = [1, 2, 3, 4, 5, 6];
  const diceVal = rolls[Math.floor(Math.random() * rolls.length)];
  return {
    valid: true,
    turnLog: `Turn ${gameState.turnNumber || 1}: Player ${gameState.activePlayer || 1} cast the dice (${diceVal}) and advanced along the sacred corridor.`,
    historicalTacticExplanation: `In ancient tactical doctrine, controlling the center avenue was paramount for defensive security and preventing opponent flanking maneuvers.`,
    recommendedNextMove: `Consider moving your reserve unit into the adjacent sanctuary tile to secure safe harbor and block incoming counter-attacks.`,
    diceRollResult: diceVal,
    gameEnded: false,
    winner: null
  };
}
