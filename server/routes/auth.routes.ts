import { Router, Response } from 'express';
import { userRepo } from '../repositories/user.repository';
import { hashPassword, verifyPassword } from '../auth/password';
import { generateAuthToken } from '../auth/jwt';
import { validateBody } from '../middleware/validate.middleware';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';
import { authRateLimiter } from '../middleware/rateLimiter.middleware';
import { SignupSchema, LoginSchema } from '../../shared/schemas/index';

const router = Router();

// POST /api/auth/signup
router.post('/signup', authRateLimiter, validateBody(SignupSchema), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, password, name, timezone } = req.body;

    const existing = await userRepo.findByEmail(email);
    if (existing) {
      return res.status(400).json({
        success: false,
        error: 'An account with this email address already exists.'
      });
    }

    const passwordHash = await hashPassword(password);
    const user = await userRepo.create({
      email,
      password_hash: passwordHash,
      name,
      timezone
    });

    const token = generateAuthToken({
      userId: user.id,
      email: user.email,
      name: user.name
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          timezone: user.timezone
        }
      }
    });
  } catch (err: any) {
    console.error('[Auth Route] Signup error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', authRateLimiter, validateBody(LoginSchema), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userRepo.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.'
      });
    }

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.'
      });
    }

    const token = generateAuthToken({
      userId: user.id,
      email: user.email,
      name: user.name
    });

    const prefs = await userRepo.getPreferences(user.id);

    res.json({
      success: true,
      message: 'Logged in successfully',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          timezone: user.timezone,
          onboardingCompleted: prefs?.onboarding_completed || false
        }
      }
    });
  } catch (err: any) {
    console.error('[Auth Route] Login error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/auth/logout
router.post('/logout', (req: AuthenticatedRequest, res: Response) => {
  res.json({ success: true, message: 'Logged out successfully.' });
});

// GET /api/auth/me
router.get('/me', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await userRepo.findById(req.user!.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    const prefs = await userRepo.getPreferences(user.id);

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        timezone: user.timezone,
        onboardingCompleted: prefs?.onboarding_completed || false,
        preferences: prefs
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
