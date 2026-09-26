import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Compass, ShieldCheck, Box, Flame, ArrowRight, BookOpen, Layers, Award, Users, CheckCircle, Cpu, Hammer } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import GameCard from '../components/GameCard';
import { fetchGames } from '../lib/api';

export default function LandingPage() {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await fetchGames({ limit: 6, sort: 'popular' });
        if (res.success && res.data) {
          setFeaturedGames(res.data);
        }
      } catch (err) {
        console.error('Failed to load featured games:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Cultural Masterpieces Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-heritage-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🏆</span>
              <h2 className="font-heritage text-2xl sm:text-3xl font-bold text-lapis-900">
                Featured Cultural Innovations
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-lapis-600 font-medium">
              Student-designed games and authentic historical prototypes verified by archaeology educators.
            </p>
          </div>

          <Link
            to="/gallery"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-terracotta-600 hover:text-terracotta-700 transition-colors"
          >
            <span>View All in Community Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-heritage-200/60 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </section>

      {/* 3. 4-Step Innovation Studio Flow */}
      <section className="bg-sand-100/70 border-y border-heritage-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600 bg-terracotta-100 px-3 py-1 rounded-full border border-terracotta-200">
              End-to-End Creation Workflow
            </span>
            <h2 className="font-heritage text-3xl sm:text-4xl font-bold text-lapis-900 mt-3">
              How SanskritiPlay Works
            </h2>
            <p className="text-sm sm:text-base text-lapis-700 font-medium mt-2">
              From raw archaeological artifacts to tested board mechanics and classroom 3D prototypes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Select Era & Artifact',
                desc: 'Input target civilizations, age ranges, and archaeological inspirations (e.g. Harappan dice or Ur boards).',
                icon: Compass,
                color: 'bg-terracotta-100 text-terracotta-700'
              },
              {
                step: '02',
                title: 'Gemini AI Synthesis',
                desc: 'Gemini 2.5 Flash outputs structured game rules, historical lore, educational outcomes, and component specs.',
                icon: Cpu,
                color: 'bg-amber-100 text-amber-800'
              },
              {
                step: '03',
                title: '2D Canvas Playtesting',
                desc: 'Test move legality, cast authentic ancient randomizers (cowries, bone dice), and consult the AI tactical arbiter.',
                icon: Layers,
                color: 'bg-emerald-100 text-emerald-800'
              },
              {
                step: '04',
                title: 'Fabricate & Publish',
                desc: 'Export 3D STL files, printable PDF rulebooks, calculate manufacturing costs, and share to the public gallery.',
                icon: Box,
                color: 'bg-lapis-100 text-lapis-800'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="heritage-card rounded-2xl p-6 border border-heritage-200 flex flex-col justify-between hover:shadow-lg transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${item.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-heritage text-2xl font-extrabold text-heritage-300">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="font-heritage text-base font-bold text-lapis-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-lapis-600 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Student Innovation Challenge CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-lapis-900 via-lapis-800 to-terracotta-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-500/30 border border-terracotta-400/40 text-terracotta-200 text-xs font-bold">
              <Award className="w-4 h-4" />
              <span>Student Maker Prize 2026</span>
            </div>

            <h2 className="font-heritage text-3xl sm:text-4xl font-extrabold leading-tight">
              Ready to Craft Your Ancient Masterpiece?
            </h2>

            <p className="text-sm sm:text-base text-heritage-200 leading-relaxed font-medium">
              Join thousands of student innovators, teachers, and cultural researchers. Create your original game concept in under 60 seconds with AI assistance and export full 3D fabrication blueprints.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/studio"
                className="px-6 py-3.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-sm flex items-center gap-2 shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch AI Studio Now</span>
              </Link>
              <Link
                to="/challenge"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
              >
                <span>Read Challenge Rubric</span>
              </Link>
            </div>
          </div>

          <div className="absolute -right-10 -bottom-10 opacity-10 text-[220px] pointer-events-none font-heritage">
            🏺
          </div>
        </div>
      </section>
    </div>
  );
}
