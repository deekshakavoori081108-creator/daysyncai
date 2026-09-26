import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import DB & services
import { db } from './db/index';
import { authMiddleware } from './middleware/auth.middleware';
import { apiRateLimiter } from './middleware/rateLimiter.middleware';

// Import Routes
import authRoutes from './routes/auth.routes';
import onboardingRoutes from './routes/onboarding.routes';
import profileRoutes from './routes/profile.routes';
import routineRoutes from './routes/routine.routes';
import morningRoutes from './routes/morning.routes';
import dnaRoutes from './routes/dna.routes';
import historyRoutes from './routes/history.routes';
import contextRoutes from './routes/context.routes';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database & Seed
db.init();

// Middleware setup
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id', 'x-user-name', 'x-user-email']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));
app.use(apiRateLimiter);
app.use(authMiddleware);

// API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/routine', routineRoutes);
app.use('/api/morning', morningRoutes);
app.use('/api/morning-dna', dnaRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/context', contextRoutes);

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'DaySync AI Engine',
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '')
  });
});

// Production Static Serving
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../dist/client');
  app.use(express.static(clientDist));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[DaySync Server Error]:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

export default app;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`========================================================`);
  console.log(`⚡ DaySync AI Operating System Server running on :${PORT}`);
  console.log(`🧠 AI Engine: Gemini 2.5 Flash Adaptive Morning Core`);
  console.log(`🛡️ Auth & Data Isolation: Enforced with JWT & Scopes`);
  console.log(`========================================================`);
});