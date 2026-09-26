import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Sparkles, Heart, GitFork, Star, Box, Scroll, BookOpen, Play, Download, ArrowLeft, MessageSquare, CheckCircle2, UserCheck } from 'lucide-react';
import BlueprintViewer from '../components/BlueprintViewer';
import RulebookCard from '../components/RulebookCard';
import PlaytestCanvas from '../components/PlaytestCanvas';
import HistoricalContextCard from '../components/HistoricalContextCard';
import PrintableExportModal from '../components/PrintableExportModal';
import { fetchGameById, likeGame, forkGame, submitReview } from '../lib/api';
import { getCivilizationThemeColor } from '../lib/utils';

export default function GameDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('playtest');
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Review Form State
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [historicalRating, setHistoricalRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchGameById(id);
        if (res.success && res.data) {
          setGame(res.data);
        }
      } catch (err) {
        console.error('Failed to load game:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleLike = async () => {
    if (!game?.id) return;
    try {
      const res = await likeGame(game.id);
      if (res.success) {
        setGame(prev => ({ ...prev, likesCount: res.data.likesCount }));
      }
    } catch (e) {}
  };

  const handleFork = async () => {
    if (!game?.id) return;
    try {
      const res = await forkGame(game.id);
      if (res.success) {
        navigate(`/studio?preset=${encodeURIComponent(game.civilization)}`);
      }
    } catch (e) {}
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSubmittingReview(true);

    try {
      const res = await submitReview({
        gameId: Number(id),
        authorName: authorName.trim() || 'Educator & Playtester',
        rating: Number(rating),
        historicalAccuracyRating: Number(historicalRating),
        feedback: feedback.trim()
      });

      if (res.success) {
        setGame(prev => ({
          ...prev,
          reviews: [res.data, ...(prev.reviews || [])]
        }));
        setFeedback('');
        setReviewSuccess(true);
        setTimeout(() => setReviewSuccess(false), 4000);
      }
    } catch (err) {
      alert('Failed to submit review: ' + err.message);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-terracotta-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="font-heritage text-lg text-lapis-800">Unearthing historical game archives...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <span className="text-4xl">🏺</span>
        <h2 className="font-heritage text-2xl font-bold text-lapis-900">Game Blueprint Not Found</h2>
        <p className="text-sm text-lapis-600">The requested artifact could not be located in the archives.</p>
        <Link to="/gallery" className="inline-block px-5 py-2.5 rounded-xl bg-terracotta-500 text-white font-bold text-xs">
          Return to Gallery
        </Link>
      </div>
    );
  }

  const civTheme = getCivilizationThemeColor(game.civilization);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Link */}
      <Link
        to="/gallery"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-lapis-600 hover:text-terracotta-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Community Gallery</span>
      </Link>

      {/* Main Game Header Banner */}
      <div className="heritage-card rounded-2xl p-6 sm:p-8 border-2 border-heritage-300 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full ${civTheme.badge}`}>
                {game.civilization}
              </span>
              <span className="text-xs font-bold text-lapis-700 bg-heritage-100 px-3 py-1 rounded-full border border-heritage-200">
                {game.gameType}
              </span>
              <span className="text-xs font-bold text-lapis-700 bg-heritage-100 px-3 py-1 rounded-full border border-heritage-200">
                Target Age: {game.targetAge}
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {game.complexity || 'Intermediate'}
              </span>
            </div>

            <h1 className="font-heritage text-3xl sm:text-4xl font-extrabold text-lapis-900">
              {game.title}
            </h1>
            <p className="text-sm sm:text-base text-terracotta-700 font-lore italic font-medium">
              "{game.tagline}"
            </p>

            <div className="flex items-center gap-3 text-xs text-lapis-600 pt-1">
              <span>Author: <strong>{game.authorName || 'Student Innovator'}</strong></span>
              <span>•</span>
              <div className="flex items-center gap-1 text-amber-800 font-bold">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                <span>{game.avgRating || 4.9}</span>
                <span>({game.reviews ? game.reviews.length : 0} reviews)</span>
              </div>
            </div>
          </div>

          {/* Action Center */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-heritage-100 hover:bg-terracotta-50 text-lapis-800 hover:text-terracotta-600 border border-heritage-300 text-xs font-bold transition-all"
            >
              <Heart className="w-4 h-4 text-terracotta-500" />
              <span>{game.likesCount || 0} Likes</span>
            </button>

            <button
              onClick={handleFork}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-heritage-100 hover:bg-heritage-200 text-lapis-800 border border-heritage-300 text-xs font-bold transition-all"
            >
              <GitFork className="w-4 h-4 text-lapis-600" />
              <span>Remix in Studio</span>
            </button>

            <button
              onClick={() => setExportModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-bold shadow-md transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Blueprint (PDF/3D)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-heritage-200 pb-2 overflow-x-auto">
        {[
          { id: 'playtest', name: '2D Playtest Simulator', icon: Play },
          { id: 'rulebook', name: 'Codified Rulebook', icon: Scroll },
          { id: 'blueprint', name: '3D Specs & Fab-Lab Costs', icon: Box },
          { id: 'history', name: 'Archaeology & Lore', icon: BookOpen },
          { id: 'reviews', name: `Reviews & Ratings (${game.reviews?.length || 0})`, icon: MessageSquare }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-terracotta-500 text-white shadow-sm'
                  : 'bg-heritage-100 text-lapis-700 hover:bg-heritage-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="animate-fade-in">
        {activeTab === 'playtest' && (
          <PlaytestCanvas game={game} />
        )}

        {activeTab === 'rulebook' && (
          <RulebookCard ruleset={game.ruleset} title={game.title} />
        )}

        {activeTab === 'blueprint' && (
          <BlueprintViewer game={game} />
        )}

        {activeTab === 'history' && (
          <HistoricalContextCard game={game} />
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-8">
            {/* Submit Review Card */}
            <div className="heritage-card rounded-2xl p-6 sm:p-8 border-2 border-heritage-300">
              <h3 className="font-heritage text-xl font-bold text-lapis-900 mb-2">
                Submit Educator & Peer Playtest Review
              </h3>
              <p className="text-xs text-lapis-600 mb-6">
                Rate this game concept on gameplay balance, historical fidelity, and pedagogical clarity.
              </p>

              {reviewSuccess && (
                <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Review submitted successfully! Thank you for supporting cultural education.</span>
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-lapis-700 mb-1">Your Name / School:</label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Maya Lin (Grade 8 Teacher)"
                      className="w-full text-xs font-semibold p-2.5 rounded-lg border border-heritage-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-lapis-700 mb-1">Overall Gameplay Rating:</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full text-xs font-semibold p-2.5 rounded-lg border border-heritage-300 bg-white"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5 - Exceptional)</option>
                      <option value="4">⭐⭐⭐⭐ (4 - Very Good)</option>
                      <option value="3">⭐⭐⭐ (3 - Average)</option>
                      <option value="2">⭐⭐ (2 - Needs Tuning)</option>
                      <option value="1">⭐ (1 - Flawed)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-lapis-700 mb-1">Historical Accuracy Rating:</label>
                    <select
                      value={historicalRating}
                      onChange={(e) => setHistoricalRating(Number(e.target.value))}
                      className="w-full text-xs font-semibold p-2.5 rounded-lg border border-heritage-300 bg-white"
                    >
                      <option value="5">🏛️ 5/5 Highly Authentic</option>
                      <option value="4">🏛️ 4/5 Good Fidelity</option>
                      <option value="3">🏛️ 3/5 Some Modern Fiction</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-lapis-700 mb-1">Detailed Playtest Feedback:</label>
                  <textarea
                    rows={3}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your feedback on rule clarity, 3D printing results, and student engagement..."
                    required
                    className="w-full text-xs font-semibold p-3 rounded-lg border border-heritage-300 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="px-6 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs shadow transition-all disabled:opacity-50"
                >
                  {submittingReview ? 'Submitting...' : 'Post Playtest Review'}
                </button>
              </form>
            </div>

            {/* Existing Reviews List */}
            <div className="space-y-4">
              <h4 className="font-heritage text-lg font-bold text-lapis-900">
                Verified Community Reviews ({game.reviews?.length || 0})
              </h4>

              {game.reviews && game.reviews.length > 0 ? (
                <div className="space-y-3">
                  {game.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="heritage-card rounded-xl p-5 border border-heritage-200 shadow-sm space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-terracotta-600" />
                          <span className="font-heritage text-sm font-bold text-lapis-900">
                            {rev.authorName}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-lapis-700 leading-relaxed font-medium">
                        "{rev.feedback}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-heritage-100 rounded-xl border border-heritage-200 text-xs text-lapis-600">
                  No community reviews submitted yet. Be the first to playtest and review!
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Export Modal */}
      <PrintableExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        game={game}
      />
    </div>
  );
}
