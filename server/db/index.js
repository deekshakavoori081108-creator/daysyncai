import { initialHistoricalGames, initialReviews } from './seed.js';

// In-Memory & Local Resilient Database Store with complete relational support
class SanskritiDatabase {
  constructor() {
    this.games = new Map();
    this.reviews = new Map();
    this.users = new Map();
    this.nextGameId = 100;
    this.nextReviewId = 100;
    this.nextUserId = 10;
    this.initialize();
  }

  initialize() {
    // Seed initial users
    this.users.set(1, { id: 1, username: 'archaeo_guild', email: 'guild@sanskritiplay.org', createdAt: new Date() });
    this.users.set(2, { id: 2, username: 'dr_finch', email: 'finch@oxford.edu', createdAt: new Date() });
    this.users.set(3, { id: 3, username: 'priya_s', email: 'priya@student.edu', createdAt: new Date() });
    this.users.set(4, { id: 4, username: 'rahul_stem', email: 'rahul@delhischool.in', createdAt: new Date() });
    this.users.set(5, { id: 5, username: 'nadia_egypt', email: 'nadia@cairomuseum.eg', createdAt: new Date() });

    // Seed games
    for (const game of initialHistoricalGames) {
      this.games.set(game.id, {
        ...game,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    // Seed reviews
    for (const rev of initialReviews) {
      this.reviews.set(rev.id, {
        ...rev,
        createdAt: new Date().toISOString()
      });
    }
    console.log(`[DB] Database initialized with ${this.games.size} historical games and ${this.reviews.size} verified reviews.`);
  }

  async getAllGames({ civilization, category, ageGroup, search, sort = 'popular', isPublic = true, limit = 50, offset = 0 } = {}) {
    let list = Array.from(this.games.values());

    if (isPublic !== undefined && isPublic !== null) {
      list = list.filter(g => Boolean(g.isPublic) === Boolean(isPublic));
    }

    if (civilization && civilization !== 'All') {
      list = list.filter(g => g.civilization?.toLowerCase().includes(civilization.toLowerCase()));
    }

    if (category && category !== 'All') {
      list = list.filter(g => g.gameType?.toLowerCase().includes(category.toLowerCase()));
    }

    if (ageGroup && ageGroup !== 'All') {
      list = list.filter(g => g.targetAge === ageGroup || g.targetAge === 'All Ages');
    }

    if (search && search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(g =>
        g.title?.toLowerCase().includes(q) ||
        g.tagline?.toLowerCase().includes(q) ||
        g.civilization?.toLowerCase().includes(q) ||
        g.historicalContext?.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sort === 'popular') {
      list.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
    } else if (sort === 'newest') {
      list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    } else if (sort === 'rating') {
      list.sort((a, b) => {
        const rA = this.getAverageRating(a.id);
        const rB = this.getAverageRating(b.id);
        return rB - rA;
      });
    } else if (sort === 'forks') {
      list.sort((a, b) => (b.forkCount || 0) - (a.forkCount || 0));
    }

    const total = list.length;
    const paginated = list.slice(offset, offset + limit);

    return {
      games: paginated.map(g => ({
        ...g,
        avgRating: this.getAverageRating(g.id),
        reviewCount: this.getReviewsForGame(g.id).length
      })),
      total
    };
  }

  async getGameById(id) {
    const numId = Number(id);
    const game = this.games.get(numId);
    if (!game) return null;
    const reviews = this.getReviewsForGame(numId);
    return {
      ...game,
      avgRating: this.getAverageRating(numId),
      reviews
    };
  }

  async createGame(gameData) {
    const id = this.nextGameId++;
    const now = new Date().toISOString();
    const newGame = {
      id,
      userId: gameData.userId || 1,
      title: gameData.title || 'Untitled Ancient Game',
      tagline: gameData.tagline || 'A new cultural innovation concept.',
      civilization: gameData.civilization || 'Ancient Mesopotamia',
      gameType: gameData.gameType || 'Board Game',
      targetAge: gameData.targetAge || '9-12',
      complexity: gameData.complexity || 'Intermediate',
      historicalContext: gameData.historicalContext || '',
      archaeologicalCitations: gameData.archaeologicalCitations || [],
      educationalObjectives: gameData.educationalObjectives || [],
      culturalSensitivityScore: gameData.culturalSensitivityScore || 98,
      components: gameData.components || [],
      ruleset: gameData.ruleset || { setup: '', objective: '', turnStructure: [], winningConditions: '' },
      layoutConfig: gameData.layoutConfig || { boardType: 'track' },
      fabricationBlueprint: gameData.fabricationBlueprint || null,
      authorName: gameData.authorName || 'Student Innovator',
      isPublic: gameData.isPublic !== undefined ? gameData.isPublic : true,
      likesCount: gameData.likesCount || 0,
      forkCount: gameData.forkCount || 0,
      createdAt: now,
      updatedAt: now
    };

    this.games.set(id, newGame);
    return newGame;
  }

  async updateGame(id, gameData, currentUserId = 1) {
    const numId = Number(id);
    const existing = this.games.get(numId);
    if (!existing) return null;

    // Verify ownership (or allow in dev mode)
    if (existing.userId && currentUserId && existing.userId !== currentUserId) {
      const err = new Error('Unauthorized to modify this game concept.');
      err.status = 403;
      throw err;
    }

    const updated = {
      ...existing,
      ...gameData,
      id: numId,
      updatedAt: new Date().toISOString()
    };

    this.games.set(numId, updated);
    return updated;
  }

  async deleteGame(id, currentUserId = 1) {
    const numId = Number(id);
    const existing = this.games.get(numId);
    if (!existing) return false;

    if (existing.userId && currentUserId && existing.userId !== currentUserId) {
      const err = new Error('Unauthorized to delete this game concept.');
      err.status = 403;
      throw err;
    }

    this.games.delete(numId);
    return true;
  }

  async likeGame(id) {
    const numId = Number(id);
    const game = this.games.get(numId);
    if (!game) return null;
    game.likesCount = (game.likesCount || 0) + 1;
    this.games.set(numId, game);
    return { id: numId, likesCount: game.likesCount };
  }

  async forkGame(id, newUserId = 1, authorName = 'Student Remixer') {
    const numId = Number(id);
    const source = this.games.get(numId);
    if (!source) return null;

    source.forkCount = (source.forkCount || 0) + 1;
    this.games.set(numId, source);

    const forkedGame = {
      ...source,
      id: this.nextGameId++,
      userId: newUserId,
      title: `${source.title} (Remix)`,
      authorName: authorName,
      likesCount: 0,
      forkCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.games.set(forkedGame.id, forkedGame);
    return forkedGame;
  }

  getReviewsForGame(gameId) {
    const numId = Number(gameId);
    return Array.from(this.reviews.values()).filter(r => r.gameId === numId);
  }

  getAverageRating(gameId) {
    const revs = this.getReviewsForGame(gameId);
    if (revs.length === 0) return 4.8; // default benchmark
    const sum = revs.reduce((acc, r) => acc + (r.rating || 5), 0);
    return Number((sum / revs.length).toFixed(1));
  }

  async createReview(reviewData) {
    const id = this.nextReviewId++;
    const newRev = {
      id,
      gameId: Number(reviewData.gameId),
      userId: reviewData.userId || 1,
      authorName: reviewData.authorName || 'Guest Reviewer',
      rating: Number(reviewData.rating) || 5,
      feedback: reviewData.feedback,
      historicalAccuracyRating: Number(reviewData.historicalAccuracyRating) || 5,
      funFactorRating: Number(reviewData.funFactorRating) || 5,
      createdAt: new Date().toISOString()
    };
    this.reviews.set(id, newRev);
    return newRev;
  }

  async getUserDashboard(userId = 1) {
    const all = Array.from(this.games.values());
    const userGames = all.filter(g => g.userId === Number(userId));
    const publicGames = all.filter(g => g.isPublic);

    const totalLikes = userGames.reduce((acc, g) => acc + (g.likesCount || 0), 0);
    const totalForks = userGames.reduce((acc, g) => acc + (g.forkCount || 0), 0);

    return {
      user: this.users.get(Number(userId)) || { id: userId, username: 'innovator', email: 'student@sanskritiplay.org' },
      savedGames: userGames,
      metrics: {
        totalCreated: userGames.length,
        totalLikes,
        totalForks,
        innovationScore: Math.min(100, (userGames.length * 15) + (totalLikes * 2) + 20),
        badges: [
          { name: "Harappan Cartographer", icon: "🗺️", description: "Created 1st urban grid prototype" },
          { name: "Cuneiform Decipherer", icon: "📜", description: "Integrated authentic ancient rulesets" },
          { name: "Master Fab-Lab Maker", icon: "⚙️", description: "Generated complete 3D STL specifications" }
        ]
      }
    };
  }
}

export const db = new SanskritiDatabase();
