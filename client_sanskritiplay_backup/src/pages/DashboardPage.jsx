import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, Award, Heart, GitFork, Plus, Box, ArrowRight, Trash2 } from 'lucide-react';
import GameCard from '../components/GameCard';
import { fetchDashboard, deleteGameConcept } from '../lib/api';

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await fetchDashboard();
      if (res.success && res.data) {
        setDashboardData(res.data);
      }
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this game concept?')) return;
    try {
      const res = await deleteGameConcept(id);
      if (res.success) {
        loadData();
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-terracotta-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="font-heritage text-lg text-lapis-800">Loading Student Innovation Workspace...</p>
      </div>
    );
  }

  const metrics = dashboardData?.metrics || {
    totalCreated: 3,
    totalLikes: 420,
    totalForks: 110,
    innovationScore: 92,
    badges: []
  };

  const savedGames = dashboardData?.savedGames || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Profile Banner */}
      <div className="heritage-card rounded-2xl p-6 sm:p-8 border-2 border-heritage-300 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-terracotta-500 to-heritage-600 flex items-center justify-center text-3xl text-white shadow-lg">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heritage text-2xl sm:text-3xl font-extrabold text-lapis-900">
                  Student Maker Workspace
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Active Innovator
                </span>
              </div>
              <p className="text-xs sm:text-sm text-lapis-600 font-medium mt-1">
                Portfolio of ancient toy prototypes, codified rulesets, and 3D fabrication projects.
              </p>
            </div>
          </div>

          <Link
            to="/studio"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Game</span>
          </Link>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-heritage-200">
          <div className="p-3.5 rounded-xl bg-heritage-100 border border-heritage-200">
            <span className="text-[11px] font-bold text-lapis-600 block uppercase">Created Games</span>
            <span className="font-heritage text-2xl font-extrabold text-lapis-900">{metrics.totalCreated}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-heritage-100 border border-heritage-200">
            <span className="text-[11px] font-bold text-lapis-600 block uppercase">Community Likes</span>
            <span className="font-heritage text-2xl font-extrabold text-terracotta-600">{metrics.totalLikes}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-heritage-100 border border-heritage-200">
            <span className="text-[11px] font-bold text-lapis-600 block uppercase">Remixes & Forks</span>
            <span className="font-heritage text-2xl font-extrabold text-lapis-700">{metrics.totalForks}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-heritage-100 border border-heritage-200">
            <span className="text-[11px] font-bold text-lapis-600 block uppercase">Innovation Score</span>
            <span className="font-heritage text-2xl font-extrabold text-emerald-700">{metrics.innovationScore}/100</span>
          </div>
        </div>
      </div>

      {/* Innovation Badges Earned */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-600" />
          <h3 className="font-heritage text-xl font-bold text-lapis-900">
            Innovation & Pedagogy Badges
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(metrics.badges && metrics.badges.length > 0 ? metrics.badges : [
            { name: "Harappan Cartographer", icon: "🗺️", description: "Created 1st urban grid prototype" },
            { name: "Cuneiform Decipherer", icon: "📜", description: "Integrated authentic ancient rulesets" },
            { name: "Master Fab-Lab Maker", icon: "⚙️", description: "Generated complete 3D STL specifications" }
          ]).map((badge, idx) => (
            <div
              key={idx}
              className="heritage-card rounded-xl p-4 border border-heritage-200 flex items-center gap-3.5 shadow-sm"
            >
              <span className="text-3xl">{badge.icon}</span>
              <div>
                <h4 className="font-heritage text-sm font-bold text-lapis-900">{badge.name}</h4>
                <p className="text-xs text-lapis-600 font-medium">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved & Published Games Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-heritage-200 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-terracotta-600" />
            <h3 className="font-heritage text-xl font-bold text-lapis-900">
              Your Game & Toy Prototypes ({savedGames.length})
            </h3>
          </div>
        </div>

        {savedGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedGames.map((game) => (
              <div key={game.id} className="relative group">
                <GameCard game={game} />
                {game.id >= 100 && (
                  <button
                    onClick={() => handleDelete(game.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                    title="Delete Draft"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="heritage-card rounded-2xl p-12 text-center space-y-4">
            <span className="text-4xl">🏺</span>
            <h4 className="font-heritage text-lg font-bold text-lapis-900">
              No game concepts created yet
            </h4>
            <p className="text-xs text-lapis-600 max-w-sm mx-auto">
              Launch the AI Studio to create your first historical board game or mechanical toy in under a minute!
            </p>
            <Link
              to="/studio"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs shadow transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Studio</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
