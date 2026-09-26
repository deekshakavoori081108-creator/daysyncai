# 🏺 SanskritiPlay — Cultural Heritage Toy & Game Studio
### *Student Innovation Challenge: Conceptualize & Develop Unique Toys & Games Based on Civilization, History & Culture*

[![SanskritiPlay](https://img.shields.io/badge/Heritage-SanskritiPlay-orange.svg)](https://github.com)
[![Gemini 2.5](https://img.shields.io/badge/AI%20Engine-Gemini%202.5%20Flash-blue.svg)](https://ai.google.dev)
[![React 18](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite%20%2B%20Tailwind-teal.svg)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green.svg)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%2B%20Drizzle%20ORM-indigo.svg)](https://orm.drizzle.team)
[![3D Printing](https://img.shields.io/badge/Fabrication-3D%20STL%20%2B%20Laser%20Cut-purple.svg)](https://en.wikipedia.org/wiki/3D_printing)

---

## 🏛️ 1. Project Overview & Mission

**SanskritiPlay** is an end-to-end, AI-powered cultural innovation studio designed for students, educators, and makers. It bridges ancient archaeology and modern tactile play by empowering creators to transform historical excavations, cuneiform tablets, and mythological epics into playable strategy board games, physical mechanical toys, codified rulebooks, and 3D printable CAD/STL blueprints.

---

## 🌟 2. Key Features

### 🤖 AI Game & Toy Conceptualizer (`/studio`)
- **Multi-Step Generation Wizard**: Choose civilizations (Mesopotamia, Indus Valley, Ancient Egypt, Vedic India, Viking, Maya, Han Dynasty, West Africa), target age, complexity, and fab-lab material constraints.
- **Official `@google/genai` Integration**: Powered by `gemini-2.5-flash` with structured JSON schema outputs and high-fidelity local fallback.
- **Custom Artifact Inputs**: Seed concepts with excavated museum citations (e.g. *Royal Game of Ur BM 120830*, *Mohenjo-Daro Terracotta Carts*, *Tutankhamun KV62 Senet Box*).

### 🎮 Interactive 2D Playtest Simulator (`/game/:id`)
- **Real-Time Board Engine**: Supports track, grid, modular tile, and radial layouts.
- **Interactive Piece Movement**: Drag, click-to-move, and sanctuary rosette zones.
- **Authentic Casting Randomizers**: 4-sided tetrahedral pyramid dice, 6-cowrie shell casting with mouth-up probability, Egyptian throwing sticks, and Harappan cubic dice.
- **AI Tactical Arbiter**: Consult Gemini AI for turn evaluations, opponent simulations, and historical tactic explanations.

### ⚙️ 3D Fabrication Blueprint & Cost Estimator
- **STL Part Manifest**: Dimensions, infill percentages, print duration estimates, and mechanical assembly guides.
- **Fab-Lab Cost Calculator**: Interactive sliders for filament $/kg, laser cutting stock, packaging formats, and volume discounts for 1 to 50 classroom prototyping kits.

### 📜 Publication-Grade Rulebook & PDF Generator
- **One-Click PDF Export**: Clean, styled rulebooks complete with historical citations, setup guides, turn order, and victory conditions using `jspdf`.
- **JSON Project Bundles**: Complete export for archival and classroom curriculum sharing.

### 🏛️ Community Heritage Showcase (`/gallery` & `/dashboard`)
- **Filter & Search**: Explore student submissions by civilization, category, age group, and rating.
- **Remix & Forking**: One-click clone to studio workspace for customization.
- **Peer Playtest Reviews**: 5-star rating system with historical accuracy feedback.
- **Student Workspace**: Portfolio metrics, innovation score, and achievement badges (*Harappan Cartographer*, *Cuneiform Decipherer*, *Master Fab-Lab Maker*).

---

## 🏗️ 3. Architecture & Tech Stack

```text
├── client/                      # React 18 + Vite Frontend
│   ├── src/
│   │   ├── components/          # ConceptWizard, PlaytestCanvas, BlueprintViewer, RulebookCard, etc.
│   │   ├── pages/               # LandingPage, StudioPage, GameDetailPage, GalleryPage, DashboardPage, ChallengePage
│   │   ├── lib/                 # api.js, pdfGenerator.js, presets.js, utils.js
│   │   ├── App.jsx              # Declarative React Router v6 setup
│   │   └── main.jsx
│   └── index.html               # Parchment typography with Cinzel & Playfair
├── server/                      # Node.js + Express.js API
│   ├── db/                      # Drizzle ORM schema, relational querying & seed dataset
│   ├── routes/                  # /api/games, /api/ai, /api/reviews, /api/export, /api/dashboard
│   ├── services/                # gemini.js (@google/genai SDK) & fallbackGenerator.js
│   ├── middleware/              # auth.js, rateLimiter.js, validate.js (Zod)
│   └── index.js
├── shared/                      # Isomorphic Zod schemas & TypeScript types
│   ├── schema.js
│   └── schema.ts
```

---

## 🚀 4. Getting Started & Running Locally

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
# 1. Clone repository & install dependencies
npm install

# 2. Configure Environment (Optional: add your Gemini API Key)
cp .env.example .env

# 3. Start development server (Backend on :5000, Vite Frontend on :3000)
npm run dev
```

### Production Build & Launch
```bash
# Build optimized client
npm run build

# Start production server
npm start
```
Access the application at `http://localhost:5000` (or `http://localhost:3000` in dev).

---

## 🏛️ 5. Pre-Loaded Historical Masterpieces

1. **Royal Game of Ur: Gates of Inanna** (Mesopotamia, 2600 BCE) — Deciphered by Irving Finkel from cuneiform tablet BM 33333B.
2. **Mohenjo-Daro: The Great Bath & Terracotta Caravans** (Indus Valley, 2500 BCE) — Revolving axle bullock carts and cubic pip dice.
3. **Senet: Journey of the Ba through Duat** (Ancient Egypt, 3100 BCE) — 30-square underworld raceway from KV62.
4. **Hnefatafl: The Viking King's Shieldwall** (Nordic Era, 800 CE) — Asymmetric 11x11 warfare from Gokstad ship find.
5. **Chaupar & Moksha Patam: Karma's Ladder** (Vedic India, 1500 BCE) — Cross-shaped cloth board and 6-cowrie shell probability.

---

## 🛡️ 6. Security & Best Practices

- **Zero Client-Side Secret Exposure**: `GEMINI_API_KEY` is strictly accessed on the backend.
- **Zod Validation**: Client-and-server type safety enforcing game ruleset schemas.
- **Express Rate Limiting**: AI endpoints protected against credit exhaustion.
- **Resilient Fallback**: 100% operational offline with rich cultural intelligence engine.

---

*Built with ❤️ for the Student Innovation Challenge 2026.*
