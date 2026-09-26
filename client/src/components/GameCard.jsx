import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, GitFork, Star, Box, Sparkles, ArrowRight, Download, Eye } from 'lucide-react';
import { getCivilizationThemeColor } from '../lib/utils';
import { likeGame, forkGame } from '../lib/api';

export default function GameCard({ game, onLiked, onForked }) {
  const [likes, setLikes] = useState(game?.likesCount || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [forks, setForks] = useState(game?.forkCount || 0);

  const civTheme = getCivilizationThemeColor(game?.civilization);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiking || !game?.id) return;
    setIsLiking(true);

    try {
      const res = await likeGame(game.id);
      if (res.success) {
        setLikes(res.data.likesCount);
        setIsLiked(true);
        if (onLiked) onLiked(game.id, res.data.likesCount);
      }
    } catch (err) {
      console.error('Like failed:', err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleFork = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!game?.id) return;

    try {
      const res = await forkGame(game.id);
      if (res.success) {
        setForks(prev => prev + 1);
        if (onForked) onForked(res.data);
      }
    } catch (err) {
      console.error('Fork failed:', err);
    }
  };

  return (
    <div className="heritage-card rounded-2xl p-5 border border-heritage-200 hover:border-terracotta-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${civTheme.badge}`}>
            {game.civilization}
          </span>
          <span className="text-[11px] font-semibold text-lapis-600 bg-heritage-100 px-2 py-0.5 rounded border border-heritage-200">
            {game.gameType}
          </span>
        </div>

        {/* Title & Tagline */}
        <Link to={`/game/${game.id}`} className="block group-hover:text-terracotta-600 transition-colors">
          <h4 className="font-heritage text-lg font-bold text-lapis-900 line-clamp-1 mb-1.5">
            {game.title}
          </h4>
        </Link>
        <p className="text-xs text-lapis-700 line-clamp-2 leading-relaxed font-medium mb-4">
          {game.tagline}
        </p>

        {/* Components Preview Chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="text-[10px] font-semibold text-lapis-600 bg-white px-2 py-0.5 rounded border border-heritage-200">
            🎯 Age: {game.targetAge}
          </span>
          <span className="text-[10px] font-semibold text-lapis-600 bg-white px-2 py-0.5 rounded border border-heritage-200">
            ⚖️ {game.complexity || 'Intermediate'}
          </span>
          {game.fabricationBlueprint && (
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <Box className="w-3 h-3 text-emerald-600" /> 3D Ready
            </span>
          )}
        </div>
      </div>

      {/* Footer Details & Interactive Actions */}
      <div className="pt-3 border-t border-heritage-200/80 flex items-center justify-between text-xs text-lapis-600">
        <div className="flex items-center gap-1 font-bold text-amber-800">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
          <span>{game.avgRating || 4.9}</span>
          <span className="text-[10px] text-lapis-500 font-normal">({game.reviewCount || (game.reviews ? game.reviews.length : 1)})</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Like Button */}
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold transition-all ${
              isLiked
                ? 'bg-terracotta-50 text-terracotta-600'
                : 'hover:bg-heritage-100 text-lapis-600 hover:text-terracotta-600'
            }`}
            title="Like Game"
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-terracotta-600' : ''}`} />
            <span>{likes}</span>
          </button>

          {/* Fork Button */}
          <button
            onClick={handleFork}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold hover:bg-heritage-100 text-lapis-600 hover:text-terracotta-600 transition-all"
            title="Remix & Fork in Studio"
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>{forks}</span>
          </button>

          {/* Inspect Link */}
          <Link
            to={`/game/${game.id}`}
            className="p-1.5 rounded-lg bg-terracotta-500 hover:bg-terracotta-600 text-white shadow transition-all"
            title="Open Blueprint & Playtester"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
