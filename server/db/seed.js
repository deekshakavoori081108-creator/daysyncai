export const initialHistoricalGames = [
  {
    id: 1,
    userId: 1,
    title: "Royal Game of Ur: Gates of Inanna",
    tagline: "Navigate the 20-square cosmological raceway of ancient Sumerian kings and high priests.",
    civilization: "Ancient Mesopotamia",
    gameType: "Board Game",
    targetAge: "9-12",
    complexity: "Intermediate",
    historicalContext: "Discovered by Sir Leonard Woolley in the Royal Cemetery at Ur (circa 2600 BCE) and deciphered by Irving Finkel from cuneiform clay tablets. It was played across all social strata from royal palaces to soldiers' taverns.",
    archaeologicalCitations: [
      "British Museum Artifact BM 120830 (The Royal Game of Ur)",
      "Cuneiform tablet BM 33333B by scribe Itti-Marduk-balāṭu (177 BCE)",
      "Woolley, L. (1934) 'Ur Excavations: The Royal Cemetery'"
    ],
    educationalObjectives: [
      "Understand tetrahedral (4-sided) binary probability mechanics in ancient mathematics.",
      "Explore Mesopotamian astrology, rosette sanctuary squares, and afterlife divination.",
      "Analyze safe-zone vs. contested raceway dynamics in early strategic game design."
    ],
    culturalSensitivityScore: 100,
    authorName: "Archaeology Lab & Student Guild",
    isPublic: true,
    likesCount: 142,
    forkCount: 38,
    components: [
      {
        name: "Ur Inlaid Board (3x8 rosette grid with narrow isthmus)",
        quantity: 1,
        material: "Lapis lazuli, shell inlay & wood / 3D PLA Print",
        description: "20-square board with five distinct rosette sanctuary tiles",
        dimensions: "280 x 120 x 25 mm",
        fabricationMethod: "Laser Cut Wood + 3D Inlay Tiles",
        estimatedUnitCostUsd: 4.80
      },
      {
        name: "Lapis & Carnelian Playing Discs",
        quantity: 14,
        material: "Cast resin or engraved wooden tokens (7 dark, 7 light)",
        description: "7 pieces per player marked with five white dots or engraved lion seals",
        dimensions: "22 mm diameter x 6 mm height",
        fabricationMethod: "3D Print (PLA / Wood-Fill)",
        estimatedUnitCostUsd: 1.50
      },
      {
        name: "Mesopotamian Tetrahedral Pyramid Dice",
        quantity: 4,
        material: "Polished bone or 3D printed pyramid dice with two marked apexes",
        description: "Each 4-sided die has 2 tipped corners painted white (Values: 0-4)",
        dimensions: "18 x 18 x 18 mm",
        fabricationMethod: "3D Print (PLA)",
        estimatedUnitCostUsd: 0.90
      }
    ],
    ruleset: {
      setup: "Each player takes 7 pieces off-board. Both players enter their pieces onto their respective starting 4-square branches.",
      objective: "Be the first player to navigate all 7 pieces through the central contested raceway and bear off the board.",
      turnStructure: [
        "Roll the four tetrahedral pyramid dice (count how many marked white tips face up, resulting in a score of 0, 1, 2, 3, or 4).",
        "If you roll a 0, your turn ends immediately.",
        "Move an existing piece forward along your assigned pathway, or introduce a new piece onto the board equal to the rolled score.",
        "If you land on an opponent's piece in the shared central row, that opponent piece is captured and returned to their reserve.",
        "Landing on a Rosette Square grants an immediate extra roll and confers absolute immunity from capture."
      ],
      winningConditions: "The first player to bear off all 7 pieces from the final sanctuary square wins the favor of the gods.",
      specialRules: [
        "Rosette tiles are sacred sanctuaries: no capture allowed while resting on a rosette.",
        "Pieces must bear off with an exact dice roll beyond the 20th square."
      ],
      historicalMechanicNote: "Mesopotamians believed that outcome of the dice was directly swayed by guardian spirits."
    },
    layoutConfig: {
      boardType: "track",
      gridDimensions: { rows: 3, cols: 8 },
      diceType: "tetrahedral",
      diceCount: 4,
      tiles: [
        { id: "t0_0", label: "P1 Start 1", x: 0, y: 0, type: "start", color: "#E29374" },
        { id: "t0_1", label: "Rosette Sanctuary", x: 0, y: 1, type: "rosette", color: "#C1A456" },
        { id: "t0_2", label: "P1 Path 3", x: 0, y: 2, type: "track", color: "#E29374" },
        { id: "t0_3", label: "P1 Path 4", x: 0, y: 3, type: "track", color: "#E29374" },
        { id: "t1_0", label: "Bridge In", x: 1, y: 0, type: "portal", color: "#70AFD2" },
        { id: "t1_1", label: "Contested Raceway 1", x: 1, y: 1, type: "hazard", color: "#BA4924" },
        { id: "t1_2", label: "Contested Raceway 2", x: 1, y: 2, type: "hazard", color: "#BA4924" },
        { id: "t1_3", label: "Central Rosette", x: 1, y: 3, type: "rosette", color: "#C1A456" },
        { id: "t1_4", label: "Contested Raceway 4", x: 1, y: 4, type: "hazard", color: "#BA4924" },
        { id: "t1_5", label: "Contested Raceway 5", x: 1, y: 5, type: "hazard", color: "#BA4924" },
        { id: "t1_6", label: "Bridge Out", x: 1, y: 6, type: "portal", color: "#70AFD2" },
        { id: "t1_7", label: "Final Raceway", x: 1, y: 7, type: "hazard", color: "#BA4924" },
        { id: "t2_0", label: "P2 Start 1", x: 2, y: 0, type: "start", color: "#96D4C6" },
        { id: "t2_1", label: "Rosette Sanctuary", x: 2, y: 1, type: "rosette", color: "#C1A456" },
        { id: "t2_2", label: "P2 Path 3", x: 2, y: 2, type: "track", color: "#96D4C6" },
        { id: "t2_3", label: "P2 Path 4", x: 2, y: 3, type: "track", color: "#96D4C6" },
        { id: "t0_6", label: "P1 Sanctuary Exit", x: 0, y: 6, type: "goal", color: "#C85A32" },
        { id: "t0_7", label: "P1 Rosette Goal", x: 0, y: 7, type: "rosette", color: "#C1A456" },
        { id: "t2_6", label: "P2 Sanctuary Exit", x: 2, y: 6, type: "goal", color: "#2A9D8F" },
        { id: "t2_7", label: "P2 Rosette Goal", x: 2, y: 7, type: "rosette", color: "#C1A456" }
      ],
      pieces: [
        { id: "p1_1", name: "Inanna's Falcon 1", player: 1, startX: 0, startY: 0, color: "#C85A32", icon: "🦅" },
        { id: "p1_2", name: "Inanna's Falcon 2", player: 1, startX: 0, startY: 0, color: "#C85A32", icon: "🦅" },
        { id: "p1_3", name: "Inanna's Falcon 3", player: 1, startX: 0, startY: 0, color: "#C85A32", icon: "🦅" },
        { id: "p2_1", name: "Anu's Bull 1", player: 2, startX: 2, startY: 0, color: "#264653", icon: "🐂" },
        { id: "p2_2", name: "Anu's Bull 2", player: 2, startX: 2, startY: 0, color: "#264653", icon: "🐂" },
        { id: "p2_3", name: "Anu's Bull 3", player: 2, startX: 2, startY: 0, color: "#264653", icon: "🐂" }
      ]
    },
    fabricationBlueprint: {
      primaryFabricationMethod: "3D Print (PLA) + Laser Engraving",
      recommendedFilamentOrStock: "Wood-Fill PLA (20% real wood particles) or Birch Plywood 4mm",
      totalEstimatedWeightGrams: 165,
      estimatedPrintTimeHours: 4.5,
      estimatedManufacturingCostUsd: 7.20,
      tolerancesMm: 0.2,
      assemblyInstructions: [
        "1. Print main board body at 0.2mm layer height with 15% gyroid infill for structural durability.",
        "2. Print 20 square tile inserts in contrasting dual-color filament (Gold and Midnight Blue).",
        "3. Snap or friction-fit the rosette and textured tiles into the frame recesses.",
        "4. Print four D4 tetrahedral dice with chamfered tips and fill dot markings with white acrylic paint."
      ],
      stlPartFilesSuggested: [
        { partName: "Ur_MainBoard_Chassis.stl", dimensionsMm: "280 x 120 x 18 mm", infillPercentage: 15, description: "Hollow-bottomed structural playing tray" },
        { partName: "Ur_Rosette_Sanctuary_Tile_x5.stl", dimensionsMm: "32 x 32 x 4 mm", infillPercentage: 20, description: "Intricate 8-petal Sumerian star rosette relief" },
        { partName: "Ur_Tetrahedral_Pyramid_Dice_x4.stl", dimensionsMm: "18 x 18 x 18 mm", infillPercentage: 35, description: "Weighted 4-sided dice with marked vertices" }
      ]
    }
  },
  {
    id: 2,
    userId: 1,
    title: "Mohenjo-Daro: The Great Bath & Terracotta Caravans",
    tagline: "Build hydraulic drainage channels and lead terracotta bullock carts through Indus Valley town-planning grids.",
    civilization: "Indus Valley (Harappan)",
    gameType: "Physical Toy",
    targetAge: "5-8",
    complexity: "Beginner",
    historicalContext: "Excavations at Harappa, Mohenjo-Daro, and Lothal unearthed hundreds of terracotta toy carts with revolving wheels, movable oxen heads, whistling birds, and cubical dice with 1 to 6 pip markings identical to modern dice.",
    archaeologicalCitations: [
      "National Museum New Delhi: Indus Terracotta Toy Cart (Acc. No. 5041/276)",
      "Kenoyer, J.M. (1998) 'Ancient Cities of the Indus Valley Civilization'",
      "Lothal Maritime Dockyard Excavation Report by S.R. Rao"
    ],
    educationalObjectives: [
      "Discover the world's earliest grid-planned urban engineering and closed sanitary drainage systems.",
      "Understand axle-and-wheel mechanical principles using traditional Harappan terracotta toy replicas.",
      "Explore Bronze Age riverine trade networks between Lothal, Meluhha, and Dilmun."
    ],
    culturalSensitivityScore: 100,
    authorName: "Indus Heritage Club",
    isPublic: true,
    likesCount: 98,
    forkCount: 24,
    components: [
      {
        name: "Terracotta Bullock Carts with Rotating Axles",
        quantity: 4,
        material: "Fired terracotta clay or 3D printed terracotta PLA",
        description: "Chassis with perforated axle sockets and detachable humped Zebu bulls",
        dimensions: "85 x 45 x 40 mm",
        fabricationMethod: "3D Print or Clay Press Mold",
        estimatedUnitCostUsd: 3.20
      },
      {
        name: "Mohenjo-Daro Modular Grid City Tiles",
        quantity: 24,
        material: "Engraved birch wood or thick card tiles with baked-brick patterns",
        description: "Streets, Great Bath, granaries, and underground drainage canal paths",
        dimensions: "60 x 60 x 3 mm each",
        fabricationMethod: "Laser Cut Wood / Die Cut Cardstock",
        estimatedUnitCostUsd: 3.90
      },
      {
        name: "Harappan Cubical Pip Dice",
        quantity: 2,
        material: "Clay or dense PLA with 1-6 concentric ring pips",
        description: "Exact replicas of Lothal cubic dice",
        dimensions: "16 x 16 x 16 mm",
        fabricationMethod: "3D Print (PLA)",
        estimatedUnitCostUsd: 0.60
      }
    ],
    ruleset: {
      setup: "Construct the central Great Bath tile. Players draw 3 modular street tiles each to build out the cardinal urban grid.",
      objective: "Transport carnelian beads, copper ingots, and grain from city granaries to the maritime dockyard safely.",
      turnStructure: [
        "Place one modular street or canal tile to expand the Harappan street grid.",
        "Roll the Harappan pip dice to move your terracotta bullock cart along paved brick avenues.",
        "Collect goods tokens from granaries and deliver them to the tidal dockyard at Lothal.",
        "Avoid seasonal monsoon flooding by activating terracotta drainage overflow tiles."
      ],
      winningConditions: "The player who successfully completes three trade circuits and maintains clean urban water supply wins Master Architect honours.",
      specialRules: [
        "Zebu bulls can pivot 90 degrees at any cardinal street intersection.",
        "Great Bath tiles restore energy to stalled merchant carts."
      ],
      historicalMechanicNote: "Indus grid systems used standardized 1:2:4 brick ratios throughout all settlements."
    },
    layoutConfig: {
      boardType: "modular_tiles",
      gridDimensions: { rows: 4, cols: 4 },
      diceType: "d6",
      diceCount: 2,
      tiles: [
        { id: "m0_0", label: "Granary Warehouse", x: 0, y: 0, type: "resource", color: "#C1A456" },
        { id: "m0_1", label: "North Avenue", x: 0, y: 1, type: "track", color: "#F4F1DE" },
        { id: "m0_2", label: "Citadel Wall", x: 0, y: 2, type: "hazard", color: "#C85A32" },
        { id: "m0_3", label: "East Gate", x: 0, y: 3, type: "portal", color: "#2A9D8F" },
        { id: "m1_1", label: "The Great Bath", x: 1, y: 1, type: "sanctuary", color: "#70AFD2" },
        { id: "m1_2", label: "Drainage Canal", x: 1, y: 2, type: "track", color: "#9ECBE2" },
        { id: "m3_3", label: "Lothal Dockyard", x: 3, y: 3, type: "goal", color: "#264653" }
      ],
      pieces: [
        { id: "cart_red", name: "Harappa Zebu Cart", player: 1, startX: 0, startY: 0, color: "#C85A32", icon: "🐂" },
        { id: "cart_teal", name: "Lothal Maritime Cart", player: 2, startX: 0, startY: 3, color: "#2A9D8F", icon: "⛵" }
      ]
    },
    fabricationBlueprint: {
      primaryFabricationMethod: "3D Printing + Snap-fit Wooden Axles",
      recommendedFilamentOrStock: "Terracotta Red PLA (Matte finish) + 3mm Wooden Dowels",
      totalEstimatedWeightGrams: 210,
      estimatedPrintTimeHours: 6.0,
      estimatedManufacturingCostUsd: 8.50,
      tolerancesMm: 0.3,
      assemblyInstructions: [
        "1. Print bullock cart body with bottom channel supports.",
        "2. Insert 3mm bamboo or wooden dowels through wheel hubs and chassis holes.",
        "3. Press-fit humped Zebu figurine onto front cart peg."
      ],
      stlPartFilesSuggested: [
        { partName: "Indus_Bullock_Cart_Chassis.stl", dimensionsMm: "85 x 45 x 22 mm", infillPercentage: 25, description: "Solid chassis with authentic Harappan curved side-rails" },
        { partName: "Indus_Spoked_Solid_Wheel_x4.stl", dimensionsMm: "35 x 35 x 6 mm", infillPercentage: 40, description: "Tri-segmented ancient disk wheels" }
      ]
    }
  },
  {
    id: 3,
    userId: 1,
    title: "Senet: Journey of the Ba through Duat",
    tagline: "Guide your soul across 30 squares of life, overcoming the Waters of Chaos to reach Osiris.",
    civilization: "Ancient Egypt",
    gameType: "Ancient Strategy Board Games",
    targetAge: "13+",
    complexity: "Intermediate",
    historicalContext: "Dating back to the Pre-dynastic period (c. 3100 BCE) and depicted in the tomb of Queen Nefertari. Originally a secular game of racing tokens, Senet evolved during the New Kingdom into a sacred ritual representing the soul's journey (Ba) through the underworld (Duat).",
    archaeologicalCitations: [
      "Tutankhamun Tomb KV62: Ebony and Ivory Senet Gaming Box (Egyptian Museum, Cairo)",
      "Tomb of Nefertari (QV66): Wall painting depicting Queen playing Senet against fate",
      "Piccione, P. A. (1990) 'Historical Dictionary of Senet & Egyptian Board Games'"
    ],
    educationalObjectives: [
      "Decipher ancient Egyptian hieroglyphic symbols (House of Beauty, Waters of Chaos, Three Truths).",
      "Analyze the cultural synthesis between recreation, philosophy, and funerary theology.",
      "Master strategic piece blocking, defensive clustering, and risk-reward probability."
    ],
    culturalSensitivityScore: 100,
    authorName: "Nile Valley Academy",
    isPublic: true,
    likesCount: 178,
    forkCount: 52,
    components: [
      {
        name: "30-Square Senet Box (3x10 Grid with Hieroglyphics)",
        quantity: 1,
        material: "Stained Walnut Wood or 3D Printed Sandstone PLA",
        description: "Pull-out drawer for pawns with carved hieroglyphic squares on tiles 26-30",
        dimensions: "320 x 110 x 45 mm",
        fabricationMethod: "Laser Cut Box + Engraving",
        estimatedUnitCostUsd: 6.20
      },
      {
        name: "Conical Spools & Ankh Pawns",
        quantity: 10,
        material: "Cast green faience or dual-color PLA (5 spools, 5 cones)",
        description: "Classic Egyptian playing pieces representing rival souls",
        dimensions: "18 mm diameter x 35 mm height",
        fabricationMethod: "3D Print (PLA)",
        estimatedUnitCostUsd: 1.80
      },
      {
        name: "Casting Sticks (Throwing Sticks)",
        quantity: 4,
        material: "Birch wood sticks flat on one side, rounded and marked on the other",
        description: "Binary casting mechanism producing scores from 1 to 5",
        dimensions: "120 x 15 x 6 mm",
        fabricationMethod: "Laser Cut Wood / Hand Planed",
        estimatedUnitCostUsd: 1.10
      }
    ],
    ruleset: {
      setup: "Place the 10 pawns alternately on the first 10 squares of the top row (S-shaped serpentine track).",
      objective: "Guide all 5 of your pawns safely through the 30 squares and bear them off from the House of Horus (Square 30).",
      turnStructure: [
        "Cast the four throwing sticks: Score = number of light sides up (if all dark, score = 5).",
        "If you throw a 1, 4, or 5, you earn an additional throw after making your move.",
        "Move one of your pawns forward in an S-curve across rows 1, 2, and 3.",
        "Landing on an isolated enemy pawn swaps positions with it (unless protected by adjacent friendly pawns).",
        "Two or more friendly pawns in adjacent squares form an unbreakable blockade."
      ],
      winningConditions: "The player who successfully bears off all 5 pawns beyond the House of Horus achieves eternal life and wins.",
      specialRules: [
        "Square 26 (House of Beauty): All pawns must stop here and cannot jump over it.",
        "Square 27 (House of Water / Netjeru): Pawns landing here drown in chaos and are sent back to Square 15 (House of Rebirth).",
        "Square 28 (House of Three Truths): Must roll exactly 3 to bear off from here."
      ],
      historicalMechanicNote: "The Egyptian concept of Ma'at (cosmic balance and justice) is mirrored in the defensive paired-pawn rule."
    },
    layoutConfig: {
      boardType: "track",
      gridDimensions: { rows: 3, cols: 10 },
      diceType: "binary_sticks",
      diceCount: 4,
      tiles: [
        { id: "s1", label: "Square 1", x: 0, y: 0, type: "start", color: "#F4F1DE" },
        { id: "s15", label: "House of Rebirth (15)", x: 1, y: 4, type: "sanctuary", color: "#70AFD2", historicalSignificance: "Rebirth in the Hall of Osiris" },
        { id: "s26", label: "House of Beauty (26)", x: 2, y: 5, type: "rosette", color: "#C1A456", historicalSignificance: "Good Fortune & Mummification" },
        { id: "s27", label: "Water of Chaos (27)", x: 2, y: 6, type: "hazard", color: "#BA4924", historicalSignificance: "Drowning in Nun" },
        { id: "s28", label: "Three Truths (28)", x: 2, y: 7, type: "track", color: "#E29374" },
        { id: "s29", label: "Re-Atum (29)", x: 2, y: 8, type: "track", color: "#E29374" },
        { id: "s30", label: "House of Horus (30)", x: 2, y: 9, type: "goal", color: "#2A9D8F", historicalSignificance: "Ascension to Heaven" }
      ],
      pieces: [
        { id: "spool_1", name: "Spool Alpha", player: 1, startX: 0, startY: 0, color: "#C85A32", icon: "🏺" },
        { id: "cone_1", name: "Cone Beta", player: 2, startX: 0, startY: 1, color: "#264653", icon: "🔺" }
      ]
    },
    fabricationBlueprint: {
      primaryFabricationMethod: "3D Printed Chassis with Sliding Magnetic Lid",
      recommendedFilamentOrStock: "Sandstone Marble PLA + Gold Silk PLA",
      totalEstimatedWeightGrams: 280,
      estimatedPrintTimeHours: 7.2,
      estimatedManufacturingCostUsd: 9.40,
      tolerancesMm: 0.25,
      assemblyInstructions: [
        "1. Print the hollow Egyptian game chest with side drawer slot.",
        "2. Print top board panel with embossed hieroglyphic symbols.",
        "3. Insert 4mm neodymium magnets into lid corners for snap-closure.",
        "4. Lightly antique the surface with dark acrylic wash to highlight carvings."
      ],
      stlPartFilesSuggested: [
        { partName: "Senet_Lidded_Chest.stl", dimensionsMm: "320 x 110 x 40 mm", infillPercentage: 15, description: "Main casing with hieroglyphic relief along outer edges" },
        { partName: "Senet_Spool_Pawns_x5.stl", dimensionsMm: "18 x 18 x 35 mm", infillPercentage: 30, description: "Turned wooden style Egyptian spools" },
        { partName: "Senet_CastingSticks_x4.stl", dimensionsMm: "120 x 15 x 6 mm", infillPercentage: 50, description: "Segmented throwing sticks with ribbed convex back" }
      ]
    }
  },
  {
    id: 4,
    userId: 1,
    title: "Hnefatafl: The Viking King's Shieldwall",
    tagline: "Asymmetric Norse warfare: 24 berserker attackers besiege the King and his 12 sworn huscarls.",
    civilization: "Nordic & Viking Era",
    gameType: "Strategy Game",
    targetAge: "9-12",
    complexity: "Advanced Strategy",
    historicalContext: "Mentioned in the Old Norse Sagas and excavated from Viking ship burials (Gokstad and Valsgärde). Hnefatafl was considered a vital martial art ('Idrótt') for Norse chieftains to develop tactical acumen before raiding.",
    archaeologicalCitations: [
      "Gokstad Viking Ship Burial: Carved Tafl gaming board (Oslo Viking Ship Museum)",
      "Orkney Wood Tafl board fragment (National Museums of Scotland)",
      "Murray, H.J.R. (1913) 'A History of Chess and Tafl Games'"
    ],
    educationalObjectives: [
      "Master asymmetric warfare dynamics (Defend & Escape vs. Encircle & Capture).",
      "Understand custodial capture geometry in grid-based algorithmic games.",
      "Explore Norse naval culture, kingly retinues (Hird), and shieldwall tactics."
    ],
    culturalSensitivityScore: 100,
    authorName: "Nordic Sagas Workshop",
    isPublic: true,
    likesCount: 215,
    forkCount: 64,
    components: [
      {
        name: "11x11 Engraved Tafl Oak Board",
        quantity: 1,
        material: "Charred oak wood or 3D printed Viking Knotwork board",
        description: "Features central Throne (Konakis) and four corner Escape Sanctuaries",
        dimensions: "300 x 300 x 18 mm",
        fabricationMethod: "Laser Cut Wood + Pyrographic Engraving",
        estimatedUnitCostUsd: 5.50
      },
      {
        name: "Carved Amber King Figurine",
        quantity: 1,
        material: "Cast resin amber or 3D printed gold PLA with horned crown",
        description: "Central king piece with runic inscriptions",
        dimensions: "28 mm diameter x 55 mm height",
        fabricationMethod: "3D Print (PLA / Resin)",
        estimatedUnitCostUsd: 1.20
      },
      {
        name: "Shieldwall Warriors (12 White Huscarls, 24 Dark Berserkers)",
        quantity: 36,
        material: "Birch & Bog Oak wooden shields or two-tone 3D printed figurines",
        description: "Engraved shield tokens with Norse raven and wolf motifs",
        dimensions: "24 mm diameter x 30 mm height",
        fabricationMethod: "3D Print (PLA)",
        estimatedUnitCostUsd: 3.60
      }
    ],
    ruleset: {
      setup: "Place the King on the central Throne square (Throne). The 12 white defenders surround him in a cross formation. The 24 dark attackers deploy in 4 squads of 6 along the board edges.",
      objective: "The King wins by escaping to any of the four corner squares. The attackers win by completely surrounding and capturing the King.",
      turnStructure: [
        "Dark attackers always move first.",
        "Any piece (King, defender, attacker) moves like a Chess Rook (any number of vacant orthogonal squares).",
        "Capture occurs by 'Custodial Capture' (sandwiching an enemy piece between two of your own pieces horizontally or vertically).",
        "The central Throne and four Corner squares are hostile to all pieces except the King."
      ],
      winningConditions: "Defenders win if the King reaches any corner escape tile. Attackers win if the King is surrounded on all 4 orthogonal sides.",
      specialRules: [
        "Only the King may land on the central Throne or Corner escape squares.",
        "The King can participate in capturing attacker pieces alongside his huscarls."
      ],
      historicalMechanicNote: "Viking strategy emphasized tight shield formations; solitary warriors were vulnerable to flank ambushes."
    },
    layoutConfig: {
      boardType: "grid",
      gridDimensions: { rows: 11, cols: 11 },
      diceType: "d6",
      diceCount: 0,
      tiles: [
        { id: "throne", label: "King's Throne", x: 5, y: 5, type: "sanctuary", color: "#C1A456" },
        { id: "c1", label: "Corner Escape NW", x: 0, y: 0, type: "goal", color: "#2A9D8F" },
        { id: "c2", label: "Corner Escape NE", x: 0, y: 10, type: "goal", color: "#2A9D8F" },
        { id: "c3", label: "Corner Escape SW", x: 10, y: 0, type: "goal", color: "#2A9D8F" },
        { id: "c4", label: "Corner Escape SE", x: 10, y: 10, type: "goal", color: "#2A9D8F" }
      ],
      pieces: [
        { id: "king", name: "Jarl King", player: 1, startX: 5, startY: 5, color: "#C1A456", icon: "👑" },
        { id: "h1", name: "Huscarl North", player: 1, startX: 4, startY: 5, color: "#F4F1DE", icon: "🛡️" },
        { id: "h2", name: "Huscarl South", player: 1, startX: 6, startY: 5, color: "#F4F1DE", icon: "🛡️" },
        { id: "h3", name: "Huscarl West", player: 1, startX: 5, startY: 4, color: "#F4F1DE", icon: "🛡️" },
        { id: "h4", name: "Huscarl East", player: 1, startX: 5, startY: 6, color: "#F4F1DE", icon: "🛡️" },
        { id: "a1", name: "Berserker Top", player: 2, startX: 0, startY: 5, color: "#1D3557", icon: "⚔️" },
        { id: "a2", name: "Berserker Bottom", player: 2, startX: 10, startY: 5, color: "#1D3557", icon: "⚔️" },
        { id: "a3", name: "Berserker Left", player: 2, startX: 5, startY: 0, color: "#1D3557", icon: "⚔️" },
        { id: "a4", name: "Berserker Right", player: 2, startX: 5, startY: 10, color: "#1D3557", icon: "⚔️" }
      ]
    },
    fabricationBlueprint: {
      primaryFabricationMethod: "Laser Cut Wood with Runic Engravings",
      recommendedFilamentOrStock: "4mm Birch Plywood + Dark Walnut Stain",
      totalEstimatedWeightGrams: 350,
      estimatedPrintTimeHours: 8.0,
      estimatedManufacturingCostUsd: 11.00,
      tolerancesMm: 0.15,
      assemblyInstructions: [
        "1. Laser cut 11x11 grid with decorative knotwork border from birch plywood.",
        "2. Stain half of warrior tokens in walnut oil for dark attacker army.",
        "3. 3D print Norse King figurine with hollow base for adding ballast weight."
      ],
      stlPartFilesSuggested: [
        { partName: "Tafl_Norse_King_Figurine.stl", dimensionsMm: "28 x 28 x 55 mm", infillPercentage: 35, description: "Detailed bearded Viking chieftain with sword and shield" },
        { partName: "Tafl_Huscarl_Pawn_x12.stl", dimensionsMm: "22 x 22 x 28 mm", infillPercentage: 25, description: "Round topped warrior marker with carved iron rim" },
        { partName: "Tafl_Berserker_Pawn_x24.stl", dimensionsMm: "22 x 22 x 28 mm", infillPercentage: 25, description: "Angular raider marker with raven sigil" }
      ]
    }
  },
  {
    id: 5,
    userId: 1,
    title: "Chaupar & Moksha Patam: Karma's Ladder",
    tagline: "The original philosophical journey of virtues and vices across ancient Indian cloth boards.",
    civilization: "Vedic & Ancient India",
    gameType: "Board Game",
    targetAge: "All Ages",
    complexity: "Intermediate",
    historicalContext: "Moksha Patam (the ancestor of Snakes & Ladders) originated in ancient India as an ethical teaching tool illustrating Jain and Vedic philosophy. Chaupar/Pachisi dates back to the Mahabharata and was played on grand palace courtyards by Emperor Akbar.",
    archaeologicalCitations: [
      "National Museum New Delhi: 18th century Painted Cloth Moksha Patam (Acc. No. 89.102)",
      "Fatehpur Sikri: Giant stone Pachisi courtyard for live human pieces (1570 CE)",
      "Mahabharata epic: The fateful dice game between Pandavas and Kauravas (Sabha Parva)"
    ],
    educationalObjectives: [
      "Explore the philosophical concepts of Karma, Dharma (righteous duty), and Moksha (spiritual liberation).",
      "Master probability using cowrie shell casting (values 2, 3, 4, 6, 10, 25).",
      "Understand traditional textile-based foldable game boards and eco-friendly natural materials."
    ],
    culturalSensitivityScore: 100,
    authorName: "Vedic Heritage Lab",
    isPublic: true,
    likesCount: 164,
    forkCount: 45,
    components: [
      {
        name: "Embroidered Cross-Shaped Cloth Board (Chaupar)",
        quantity: 1,
        material: "Hand-spun khadi cotton or heavy cardstock with silk-screen prints",
        description: "Cruciform board with 4 arms of 3x8 squares and central Charkoni square",
        dimensions: "400 x 400 x 2 mm",
        fabricationMethod: "Textile Embroidery / Screen Print / Cardstock",
        estimatedUnitCostUsd: 4.20
      },
      {
        name: "Natural Cowrie Shells (Kauri)",
        quantity: 6,
        material: "Polished natural cowrie shells or 3D printed bioplastic shells",
        description: "Traditional casting dice that land with mouth up or back up",
        dimensions: "25 x 18 x 12 mm each",
        fabricationMethod: "3D Print (PLA / Bio-resin)",
        estimatedUnitCostUsd: 1.20
      },
      {
        name: "Lacquered Wooden Pawns (Goti)",
        quantity: 16,
        material: "Turned Channapatna natural lacquered wood in 4 vibrant colors",
        description: "Non-toxic organic vegetable-dyed wooden playing pieces",
        dimensions: "20 mm diameter x 40 mm height",
        fabricationMethod: "Wood Lathe / 3D Print",
        estimatedUnitCostUsd: 3.00
      }
    ],
    ruleset: {
      setup: "Each player takes 4 pawns of one color in the central Charkoni. Place the cloth board between players.",
      objective: "Navigate all 4 pawns around the outer perimeter of the cruciform board and return to the central Charkoni.",
      turnStructure: [
        "Throw the 6 cowrie shells. Count the number of shells with their opening facing upward.",
        "Scoring: 1 mouth up = 10 points + extra throw; 6 mouths up = 25 points + extra throw; 2, 3, 4, 5 mouths = face value.",
        "A throw of 10 or 25 allows a new pawn to enter the active track.",
        "Land on an opponent pawn to send it back to the central courtyard, unless it rests on a marked 'Castle' (Chauk) sanctuary square."
      ],
      winningConditions: "The first player or team to bring all four pawns home to the central Charkoni wins.",
      specialRules: [
        "Castle squares (marked with an X) are safe from all captures.",
        "Pawns can form 'doubles' (super-pieces) that can only be captured by another double."
      ],
      historicalMechanicNote: "Snakes in Moksha Patam represented vices (anger, greed, vanity) while Ladders represented virtues (humility, charity, knowledge)."
    },
    layoutConfig: {
      boardType: "track",
      gridDimensions: { rows: 9, cols: 9 },
      diceType: "cowrie_shells",
      diceCount: 6,
      tiles: [
        { id: "center", label: "Charkoni (Home)", x: 4, y: 4, type: "sanctuary", color: "#C1A456" },
        { id: "castle_n", label: "North Castle (Chauk)", x: 1, y: 4, type: "rosette", color: "#C85A32" },
        { id: "castle_s", label: "South Castle (Chauk)", x: 7, y: 4, type: "rosette", color: "#2A9D8F" },
        { id: "castle_w", label: "West Castle (Chauk)", x: 4, y: 1, type: "rosette", color: "#70AFD2" },
        { id: "castle_e", label: "East Castle (Chauk)", x: 4, y: 7, type: "rosette", color: "#E29374" }
      ],
      pieces: [
        { id: "p1_goti", name: "Red Goti 1", player: 1, startX: 4, startY: 4, color: "#C85A32", icon: "🔴" },
        { id: "p2_goti", name: "Teal Goti 1", player: 2, startX: 4, startY: 4, color: "#2A9D8F", icon: "🟢" },
        { id: "p3_goti", name: "Gold Goti 1", player: 3, startX: 4, startY: 4, color: "#C1A456", icon: "🟡" },
        { id: "p4_goti", name: "Blue Goti 1", player: 4, startX: 4, startY: 4, color: "#1D3557", icon: "🔵" }
      ]
    },
    fabricationBlueprint: {
      primaryFabricationMethod: "Sewn Fabric + 3D Printed Cowrie Shells",
      recommendedFilamentOrStock: "Organic Cotton Linen + Silk White PLA",
      totalEstimatedWeightGrams: 190,
      estimatedPrintTimeHours: 3.5,
      estimatedManufacturingCostUsd: 6.80,
      tolerancesMm: 0.2,
      assemblyInstructions: [
        "1. Print or sew 4-armed Chaupar mat with reinforced cotton bias binding.",
        "2. 3D print 6 weighted cowrie shells with realistic textured aperture teeth.",
        "3. Turn 16 wooden pawns on mini-lathe and finish with non-toxic shellac dye."
      ],
      stlPartFilesSuggested: [
        { partName: "Chaupar_Cowrie_Shell_x6.stl", dimensionsMm: "25 x 18 x 12 mm", infillPercentage: 60, description: "Calibrated bio-mimetic cowrie shell with asymmetric center of gravity" },
        { partName: "Channapatna_Pawn_x16.stl", dimensionsMm: "20 x 20 x 40 mm", infillPercentage: 25, description: "Classic conical tiered Indian playing pawn" }
      ]
    }
  }
];

export const initialReviews = [
  {
    id: 1,
    gameId: 1,
    userId: 2,
    authorName: "Dr. Alistair Finch (Ancient History Faculty)",
    rating: 5,
    historicalAccuracyRating: 5,
    funFactorRating: 5,
    feedback: "Exceptional historical fidelity! The inclusion of the 4-sided tetrahedral binary mechanics and Irving Finkel's translated cuneiform rules makes this an outstanding classroom resource for 6th-grade world history."
  },
  {
    id: 2,
    gameId: 1,
    userId: 3,
    authorName: "Priya Sharma (Student Innovator)",
    rating: 5,
    historicalAccuracyRating: 5,
    funFactorRating: 4,
    feedback: "I 3D printed the Ur board using wood-fill PLA as suggested in the blueprint specs. The pieces feel authentic and the rosette sanctuary rules create thrilling race comebacks!"
  },
  {
    id: 3,
    gameId: 2,
    userId: 4,
    authorName: "Rahul Verma (Middle School STEM Teacher)",
    rating: 5,
    historicalAccuracyRating: 5,
    funFactorRating: 5,
    feedback: "Combining Harappan urban hydrology with revolving terracotta toy carts is pure pedagogical genius. My students learned more about Indus sanitation in 30 minutes of play than from weeks of textbook reading."
  },
  {
    id: 4,
    gameId: 3,
    userId: 5,
    authorName: "Nadia Mansour (Museum Educator, Cairo)",
    rating: 5,
    historicalAccuracyRating: 5,
    funFactorRating: 5,
    feedback: "The symbolic mapping of the 30 squares to the soul's journey through Duat is handled with remarkable cultural sensitivity and scholarly precision. Five stars!"
  }
];
