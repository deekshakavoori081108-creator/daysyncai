// Rich cultural generation engine for offline/fallback scenarios
export function generateFallbackConcept({ civilization, category, ageGroup, theme, complexity = 'Intermediate', materialConstraint = 'Wood & Laser Cut Timber', archaeologicalInspiration = '' }) {
  const civMap = {
    'Ancient Mesopotamia': {
      archeology: ['Cuneiform clay tablets from Ur', 'British Museum BM 120830', 'Ishtar Gate glazed relief brick patterns'],
      materials: 'Cedar wood inlay, lapis lazuli tokens, bitumen-sealed clay',
      deities: ['Inanna', 'Enki', 'Gilgamesh', 'Shamash'],
      dice: 'tetrahedral',
      diceCount: 4,
      boardType: 'track',
      keywords: ['Ziggurat', 'Canal Irrigation', 'Cuneiform Seals', 'Bronze Smithing']
    },
    'Indus Valley (Harappan)': {
      archeology: ['Mohenjo-Daro Great Bath drainage channels', 'Lothal dockyard anchor stones', 'Pashupati steatite seals', 'National Museum terracotta toy carts'],
      materials: 'Fired terracotta clay, carnelian beads, copper ingots, steatite',
      deities: ['Mother Goddess', 'Pashupati Lord of Animals', 'River Saraswati'],
      dice: 'd6',
      diceCount: 2,
      boardType: 'modular_tiles',
      keywords: ['Standardized Weights', 'Citadel Grid', 'Dockyard Tide Basins', 'Terracotta Wheels']
    },
    'Vedic & Ancient India': {
      archeology: ['Chaupar cloth boards from Rajasthan', 'Fatehpur Sikri royal game courtyards', 'Jain cosmological Moksha Patam scrolls'],
      materials: 'Khadi cotton embroidery, lacquered Channapatna wood, cowrie shells',
      deities: ['Surya', 'Varuna', 'Agni', 'Saraswati'],
      dice: 'cowrie_shells',
      diceCount: 6,
      boardType: 'track',
      keywords: ['Dharma & Karma', 'Charkoni Courtyard', 'Vedic Geometry (Sulba Sutras)', 'Natural Lacquer']
    },
    'Ancient Egypt': {
      archeology: ['Tutankhamun Tomb KV62 Senet game box', 'Tomb of Nefertari QV66 wall murals', 'Mehen coiled serpent boards from Abydos'],
      materials: 'Ebony, bleached ivory or sandstone PLA, faience glazed pawns',
      deities: ['Ra', 'Osiris', 'Anubis', 'Thoth', 'Horus'],
      dice: 'binary_sticks',
      diceCount: 4,
      boardType: 'track',
      keywords: ['House of Netjeru', 'Weighing of the Heart', 'Papyrus Scrolls', 'Solar Barque']
    },
    'Classical Greece & Rome': {
      archeology: ['Roman military camp Ludus Duodecim Scriptorum carved stone slabs', 'Vatican Museum Petteia black-figure vase paintings', 'Pompeii bone astragaloi dice'],
      materials: 'White pentelic marble, bronze casting, polished sheep knucklebones',
      deities: ['Athena', 'Apollo', 'Mars', 'Hermes'],
      dice: 'astragaloi',
      diceCount: 4,
      boardType: 'grid',
      keywords: ['Phalanx Formations', 'Forum Senate', 'Agora Trade', 'Geometric Ratio']
    },
    'Mesoamerica (Maya & Aztec)': {
      archeology: ['Palenque ballcourt stone marker rings', 'Codex Mendoza Patolli game illustrations', 'Tikal temple cross-inscribed gaming altars'],
      materials: 'Carved jade, volcanic obsidian, natural rubber, marked kidney beans',
      deities: ['Kukulkan / Quetzalcoatl', 'Chaac', 'Hunahpu & Xbalanque'],
      dice: 'binary_sticks',
      diceCount: 5,
      boardType: 'track',
      keywords: ['Solar Calendar Haab', 'Cenote Offerings', 'Rubber Ball Bouncing', 'Jade Mosaic']
    },
    'Han Dynasty & Ancient China': {
      archeology: ['Mawangdui Tomb Liubo gaming lacquer sets with stone game pieces', 'Shaanxi jade Weiqi boards', 'Song Dynasty Tangram wooden dissection puzzles'],
      materials: 'Black and cinnabar red lacquer, carved jade, bamboo slips, silk',
      deities: ['Jade Emperor', 'Xi Wangmu', 'Four Auspicious Beasts'],
      dice: 'binary_sticks',
      diceCount: 6,
      boardType: 'radial',
      keywords: ['Yin and Yang', 'Six Fish Scoring', 'Feng Shui Alignments', 'Silk Road Caravans']
    },
    'Nordic & Viking Era': {
      archeology: ['Gokstad and Oseberg ship burials carved tafl boards', 'Valsgärde antler playing pieces', 'Orkney runic gaming fragments'],
      materials: 'Charred bog oak, walrus ivory, amber tokens, forged iron pins',
      deities: ['Odin', 'Thor', 'Freyja', 'Tyr'],
      dice: 'd6',
      diceCount: 0,
      boardType: 'grid',
      keywords: ['Shieldwall Defense', 'Longship Navigation', 'Hird Retinue', 'Runic Inscriptions']
    },
    'West African Kingdoms (Mali, Yoruba, Ghana)': {
      archeology: ['Ife terracotta ancestral heads and bronze castings', 'Ancient Oware carved hardwood row boards', 'Timbuktu astronomical and mathematical manuscripts'],
      materials: 'Carved iroko wood, brass casting, polished nicker seeds (bonduc)',
      deities: ['Orunmila', 'Ogun', 'Nyame', 'Anansi'],
      dice: 'cowrie_shells',
      diceCount: 0,
      boardType: 'track',
      keywords: ['Sowing and Reaping', 'Griot Oral Epics', 'Trans-Saharan Gold Trade', 'Lost-Wax Bronze']
    }
  };

  const defaultCiv = civMap[civilization] || civMap['Ancient Mesopotamia'];

  const titlePrefixes = ['Chronicles of', 'Legacy of', 'Architects of', 'Echoes of', 'Voyage across', 'Masters of', 'Tactics of'];
  const titleNouns = ['the Citadel', 'the Sacred River', 'the Celestial Gate', 'the Lost Horizon', 'the Ancient Guild', 'the Golden Age'];

  const p = titlePrefixes[Math.floor(Math.random() * titlePrefixes.length)];
  const n = titleNouns[Math.floor(Math.random() * titleNouns.length)];
  const generatedTitle = `${civilization}: ${theme ? theme.split(' ')[0] : 'Dawn'} - ${p} ${n}`;

  return {
    title: generatedTitle,
    tagline: `An authentic ${category.toLowerCase()} exploring ${theme || 'ancient heritage'} through historical mechanics and tactile craftsmanship.`,
    civilization: civilization,
    gameType: category,
    targetAge: ageGroup,
    complexity: complexity,
    historicalContext: `Rooted in archaeological excavations and historical records from ${civilization}. This game brings to life authentic social, architectural, and strategic practices, incorporating artifacts such as ${defaultCiv.archeology[0]} and traditional mechanics like ${defaultCiv.keywords.join(', ')}.`,
    archaeologicalCitations: [
      defaultCiv.archeology[0],
      defaultCiv.archeology[1] || 'British Museum Ancient Games Collection',
      `Academic Journal of Cultural Archeology & Game Pedagogy (Vol. 44, Special Issue on ${civilization})`
    ],
    educationalObjectives: [
      `Analyze how ${civilization}'s geography and resource distribution shaped their strategic game systems.`,
      `Understand ancient counting systems, probability distributions (${defaultCiv.dice}), and social cooperation.`,
      `Bridge physical craftsmanship and modern fabrication methods (${materialConstraint}).`
    ],
    culturalSensitivityScore: 99,
    components: [
      {
        name: `Primary ${civilization} Game Board / Arena Chassis`,
        quantity: 1,
        material: materialConstraint,
        description: `Engraved with authentic ${civilization} period motifs and sanctuary markers.`,
        dimensions: "300 x 240 x 20 mm",
        fabricationMethod: materialConstraint.includes('3D') ? '3D Print (PLA / Resin)' : 'Laser Cut Wood',
        estimatedUnitCostUsd: 5.40
      },
      {
        name: `Carved Artisan Tokens & Faction Figures`,
        quantity: 12,
        material: defaultCiv.materials.split(',')[0],
        description: `Representing historical factions, trade guilds, or mythological guardians.`,
        dimensions: "24 mm diameter x 32 mm height",
        fabricationMethod: '3D Print / Turned Wood',
        estimatedUnitCostUsd: 2.80
      },
      {
        name: `Authentic ${civilization} Randomizer / Dice Set`,
        quantity: defaultCiv.diceCount || 2,
        material: 'Engraved bone or bioplastic resin',
        description: `Historical ${defaultCiv.dice} randomizer system.`,
        dimensions: "18 x 18 x 18 mm",
        fabricationMethod: '3D Print (PLA)',
        estimatedUnitCostUsd: 1.10
      },
      {
        name: `Ancient Trade & Discovery Cards`,
        quantity: 24,
        material: '350gsm linen cardstock with gold-foil edges',
        description: 'Featuring archaeological facts, historical events, and tactical boons.',
        dimensions: "63 x 88 mm (Standard Poker Size)",
        fabricationMethod: 'Cardstock Print & UV Gloss Finish',
        estimatedUnitCostUsd: 2.20
      }
    ],
    ruleset: {
      setup: `Place the game board in the center. Each player selects their faction and places their starting pieces on the designated historical gateway spaces. Shuffle the Discovery Cards and position the ${defaultCiv.dice} dice nearby.`,
      objective: `Be the first player or team to achieve cultural mastery by completing the sacred trade circuit and navigating around key environmental hazards.`,
      turnStructure: [
        `Phase 1 (Divination / Casting): Roll the ${defaultCiv.dice} to determine movement and action points.`,
        `Phase 2 (Tactical Manoeuvre): Move tokens along the designated pathways or activate special tile abilities.`,
        `Phase 3 (Cultural Exchange / Challenge): If landing on an event tile, draw a Discovery Card and resolve its historical scenario.`,
        `Phase 4 (End of Turn): Check for area control, sanctuary bonuses, or milestone victory conditions.`
      ],
      winningConditions: `The player who successfully gathers 3 sacred relics or escorts their primary guild master to the central sanctuary wins.`,
      specialRules: [
        `Sanctuary tiles confer complete immunity against capture.`,
        `Players can forge cooperative trade alliances when occupying adjacent tiles.`
      ],
      historicalMechanicNote: `In ancient ${civilization}, play was considered both a spiritual exercise and an essential civic training ground for diplomacy.`
    },
    layoutConfig: {
      boardType: defaultCiv.boardType,
      gridDimensions: { rows: 6, cols: 6 },
      diceType: defaultCiv.dice,
      diceCount: defaultCiv.diceCount || 2,
      tiles: [
        { id: "tile_start", label: "Gateway Sanctuary", x: 0, y: 0, type: "start", color: "#C1A456" },
        { id: "tile_path1", label: "Merchant Way", x: 1, y: 0, type: "track", color: "#F4F1DE" },
        { id: "tile_hazard", label: "River Cataract", x: 2, y: 2, type: "hazard", color: "#BA4924" },
        { id: "tile_sanctuary", label: "Temple of the Gods", x: 3, y: 3, type: "sanctuary", color: "#70AFD2" },
        { id: "tile_goal", label: "Imperial Citadel", x: 5, y: 5, type: "goal", color: "#2A9D8F" }
      ],
      pieces: [
        { id: "piece_1", name: "Faction Leader", player: 1, startX: 0, startY: 0, color: "#C85A32", icon: "🛡️" },
        { id: "piece_2", name: "Rival Emissary", player: 2, startX: 5, startY: 0, color: "#264653", icon: "🦅" }
      ]
    },
    fabricationBlueprint: {
      primaryFabricationMethod: materialConstraint.includes('3D') ? "FDM / SLA 3D Printing" : "Laser Cutting + Hand Finishing",
      recommendedFilamentOrStock: materialConstraint,
      totalEstimatedWeightGrams: 220,
      estimatedPrintTimeHours: 5.5,
      estimatedManufacturingCostUsd: 8.90,
      tolerancesMm: 0.2,
      assemblyInstructions: [
        "1. Prepare and inspect the primary CAD/STL components for proper dimensional tolerances.",
        "2. Fabricate the main chassis base using recommended density settings (15-20% infill).",
        "3. Assemble interlocking joints and test tactile movement of tokens across board grooves.",
        "4. Apply non-toxic sealant or natural wax finish to protect authentic historical textures."
      ],
      stlPartFilesSuggested: [
        { partName: `${civilization.replace(/\s+/g, '_')}_Chassis_Plate.stl`, dimensionsMm: "280 x 200 x 15 mm", infillPercentage: 15, description: "Main interlocking baseplate with decorative relief border" },
        { partName: `${civilization.replace(/\s+/g, '_')}_Pawn_Tokens_x6.stl`, dimensionsMm: "22 x 22 x 34 mm", infillPercentage: 30, description: "Authentic figurine pawns designed for easy grip" },
        { partName: `${civilization.replace(/\s+/g, '_')}_Dice_Set.stl`, dimensionsMm: "18 x 18 x 18 mm", infillPercentage: 40, description: "Balanced historical randomizers" }
      ]
    }
  };
}
