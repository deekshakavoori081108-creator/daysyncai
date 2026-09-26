import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Compass, ShieldCheck, Box, Flame, ArrowRight, BookOpen, Layers, Award } from 'lucide-react';

export default function HeroSection() {
  const [activeEra, setActiveEra] = useState('Indus Valley');

  const eraHighlights = {
    'Ancient Mesopotamia': {
      title: 'Royal Game of Ur (2600 BCE)',
      desc: 'Tetrahedral pyramid dice and cuneiform tablet rules discovered by Leonard Woolley in royal tombs.',
      tag: 'Ancient Strategy Board Game',
      icon: '🌌',
      stat: '5 Rosette Sanctuaries'
    },
    'Indus Valley': {
      title: 'Mohenjo-Daro Citadel & Bullock Carts',
      desc: 'Excavated rotating-axle terracotta carts, cubical pip dice, and urban drainage networks.',
      tag: 'Physical Mechanical Toy',
      icon: '🏺',
      stat: '1:2:4 Brick Ratio'
    },
    'Ancient Egypt': {
      title: 'Senet: Passage to Osiris (3100 BCE)',
      desc: 'The 30-square underworld raceway navigating the Waters of Chaos and House of Rebirth.',
      tag: 'Spiritual Race Game',
      icon: '⚖️',
      stat: '30 Hieroglyphic Tiles'
    },
    'Nordic & Viking': {
      title: 'Hnefatafl: King’s Shieldwall (800 CE)',
      desc: 'Asymmetric Norse warfare: 24 berserkers surround the king and his 12 sworn huscarls.',
      tag: 'Asymmetric Grid Strategy',
      icon: '🛡️',
      stat: '11x11 Oak Grid'
    },
    'Vedic & Classical India': {
      title: 'Chaupar & Moksha Patam (Karma’s Ladder)',
      desc: 'Ancestral cloth-board games teaching ethical virtues and cowrie shell binary probability.',
      tag: 'Cloth Board & Cowries',
      icon: '☸️',
      stat: '6 Cowrie Randomizer'
    }
  };

  const current = eraHighlights[activeEra];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-heritage-100 via-heritage-50 to-sand-100/60 border-b border-heritage-200">
      {/* Background Decorative Artifact Motifs */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C85A32_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 relative z-10">
        {/* Innovation Challenge Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-terracotta-100 border border-terracotta-200 text-terracotta-800 text-xs sm:text-sm font-bold tracking-wide mb-8 shadow-sm animate-pulse-slow">
          <Award className="w-4 h-4 text-terracotta-600" />
          <span>Student Innovation Challenge 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500"></span>
          <span className="text-terracotta-700 font-semibold hidden sm:inline">Crafting Toys & Games from Civilization & History</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="font-heritage text-4xl sm:text-5xl lg:text-6xl font-extrabold text-lapis-900 leading-[1.15] tracking-tight">
              Bridge Ancient Heritage <br />
              <span className="gold-gradient-text">Through Modern Play</span>
            </h1>

            <p className="text-base sm:text-lg text-lapis-700 leading-relaxed font-medium max-w-2xl">
              Transform archaeological discoveries, historical folklore, and ancient mechanics into playable board games, 3D printable mechanical toys, and educational rulebooks using <strong className="text-terracotta-600">Gemini 2.5 AI</strong>.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/studio"
                className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-terracotta-500 via-terracotta-600 to-terracotta-700 hover:from-terracotta-600 hover:to-terracotta-800 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-5 h-5 text-heritage-200 animate-spin-slow" />
                <span>Launch AI Game Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/gallery"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/90 hover:bg-white text-lapis-800 font-bold text-base border border-heritage-300 shadow-sm hover:shadow transition-all"
              >
                <Layers className="w-5 h-5 text-terracotta-500" />
                <span>Explore Showcase</span>
              </Link>
            </div>

            {/* Platform Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-heritage-200/80">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heritage text-lapis-900">9+</div>
                <div className="text-xs text-lapis-600 font-semibold uppercase tracking-wider">Ancient Cultures</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heritage text-terracotta-600">100%</div>
                <div className="text-xs text-lapis-600 font-semibold uppercase tracking-wider">3D Printable & PDF</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heritage text-emerald-700">Museum</div>
                <div className="text-xs text-lapis-600 font-semibold uppercase tracking-wider">Verified History</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Era Highlight Card */}
          <div className="lg:col-span-5">
            <div className="heritage-card rounded-2xl p-6 sm:p-7 border-2 border-heritage-300/80 relative shadow-xl">
              {/* Card Header with Era Selector */}
              <div className="flex items-center justify-between gap-2 mb-5">
                <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600 bg-terracotta-100 px-3 py-1 rounded-full border border-terracotta-200">
                  Interactive Heritage Matrix
                </span>
                <span className="text-xs text-lapis-500 font-medium">Select Era:</span>
              </div>

              {/* Era Pills */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {Object.keys(eraHighlights).map((era) => (
                  <button
                    key={era}
                    onClick={() => setActiveEra(era)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                      activeEra === era
                        ? 'bg-lapis-600 text-white shadow-sm'
                        : 'bg-heritage-100 text-lapis-700 hover:bg-heritage-200'
                    }`}
                  >
                    {era}
                  </button>
                ))}
              </div>

              {/* Active Showcase Details */}
              <div className="bg-gradient-to-br from-heritage-100 to-heritage-50 rounded-xl p-5 border border-heritage-200 mb-5 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{current.icon}</span>
                  <div>
                    <h3 className="font-heritage text-lg font-bold text-lapis-900">
                      {current.title}
                    </h3>
                    <span className="text-xs font-semibold text-terracotta-600">
                      {current.tag} • {current.stat}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-lapis-700 leading-relaxed font-medium mt-2">
                  {current.desc}
                </p>
              </div>

              {/* Action Button inside preview */}
              <Link
                to={`/studio?preset=${encodeURIComponent(activeEra)}`}
                className="w-full py-3 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Remix {activeEra} Game in Studio</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
