import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Sparkles, Layers, SlidersHorizontal, RefreshCw } from 'lucide-react';
import GameCard from '../components/GameCard';
import { fetchGames } from '../lib/api';
import { CivilizationsList, GameCategoriesList, AgeGroupsList } from '@shared/schema.js';

export default function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const civFromQuery = searchParams.get('civ') || 'All';

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCiv, setSelectedCiv] = useState(civFromQuery);
  const [selectedCat, setSelectedCat] = useState('All');
  const [selectedAge, setSelectedAge] = useState('All');
  const [sortOption, setSortOption] = useState('popular');

  const loadGames = async () => {
    setLoading(true);
    try {
      const res = await fetchGames({
        civilization: selectedCiv,
        category: selectedCat,
        ageGroup: selectedAge,
        search,
        sort: sortOption
      });
      if (res.success && res.data) {
        setGames(res.data);
      }
    } catch (err) {
      console.error('Failed to load gallery games:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGames();
  }, [selectedCiv, selectedCat, selectedAge, sortOption]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadGames();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-heritage-200 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🏛️</span>
            <h1 className="font-heritage text-3xl sm:text-4xl font-extrabold text-lapis-900">
              Community Heritage Gallery
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-lapis-600 font-medium mt-1">
            Discover, fork, and 3D print student-created historical toys and games from across world civilizations.
          </p>
        </div>

        <Link
          to="/studio"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Create New Concept</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-4 bg-white/70 p-4 sm:p-6 rounded-2xl border border-heritage-200 shadow-sm">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-lapis-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, artifact citation, keywords (e.g. 'Ur', 'Terracotta', 'Senet', 'Tafl')..."
              className="w-full text-xs sm:text-sm font-semibold pl-10 pr-4 py-2.5 rounded-xl border border-heritage-300 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-400"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-lapis-700 hover:bg-lapis-800 text-white text-xs font-bold transition-all shadow"
          >
            Search
          </button>
        </form>

        {/* Filter Chips: Civilizations */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-lapis-600 block mb-2">
            Filter by Civilization:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCiv('All')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedCiv === 'All'
                  ? 'bg-terracotta-500 text-white shadow-sm'
                  : 'bg-heritage-100 text-lapis-700 hover:bg-heritage-200'
              }`}
            >
              All Civilizations
            </button>
            {CivilizationsList.map((civ) => (
              <button
                key={civ}
                onClick={() => setSelectedCiv(civ)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedCiv === civ
                    ? 'bg-terracotta-500 text-white shadow-sm'
                    : 'bg-heritage-100 text-lapis-700 hover:bg-heritage-200'
                }`}
              >
                {civ.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-heritage-100">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-lapis-600 mb-1">
              Category:
            </label>
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 rounded-lg border border-heritage-300 bg-white"
            >
              <option value="All">All Categories</option>
              {GameCategoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-lapis-600 mb-1">
              Target Age:
            </label>
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 rounded-lg border border-heritage-300 bg-white"
            >
              <option value="All">All Ages</option>
              {AgeGroupsList.map(age => <option key={age} value={age}>{age} Years</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-lapis-600 mb-1">
              Sort By:
            </label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 rounded-lg border border-heritage-300 bg-white"
            >
              <option value="popular">Most Popular (Likes)</option>
              <option value="rating">Highest Rated</option>
              <option value="forks">Most Remixed & Forked</option>
              <option value="newest">Newest Creations</option>
            </select>
          </div>
        </div>
      </div>

      {/* Games Showcase Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-64 rounded-2xl bg-heritage-200/60 animate-pulse"></div>
          ))}
        </div>
      ) : games.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="heritage-card rounded-2xl p-12 text-center space-y-4">
          <span className="text-4xl">🏺</span>
          <h3 className="font-heritage text-xl font-bold text-lapis-900">
            No games found matching your filters
          </h3>
          <p className="text-xs sm:text-sm text-lapis-600 max-w-md mx-auto">
            Try adjusting your search criteria, or be the first innovator to create a game for this civilization in the AI Studio!
          </p>
          <Link
            to="/studio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs shadow transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch AI Studio</span>
          </Link>
        </div>
      )}
    </div>
  );
}
