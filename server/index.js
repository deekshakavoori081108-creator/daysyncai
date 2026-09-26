import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import middleware and routes
import { authMiddleware } from './middleware/auth.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';
import gamesRouter from './routes/games.js';
import aiRouter from './routes/ai.js';
import reviewsRouter from './routes/reviews.js';
import exportRouter from './routes/export.js';
import { db } from './db/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id', 'x-user-name', 'x-user-email']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));
app.use(authMiddleware);

// API Routes
app.use('/api/games', gamesRouter);
app.use('/api/ai', aiRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/export', exportRouter);

// Student Workspace / Dashboard route
app.get('/api/dashboard', async (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const dashboardData = await db.getUserDashboard(userId);
    res.json({ success: true, data: dashboardData });
  } catch (err) {
    console.error('[API] Error in /api/dashboard:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'SanskritiPlay API',
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '')
  });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../dist/client');
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Unhandled Error]:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🏺 SanskritiPlay API Server listening on port ${PORT}`);
  console.log(`🏛️  Cultural Heritage Toy & Game Innovation Platform`);
  console.log(`🤖 AI Engine: Gemini 2.5 Flash with Cultural Schema`);
  console.log(`====================================================`);
});
