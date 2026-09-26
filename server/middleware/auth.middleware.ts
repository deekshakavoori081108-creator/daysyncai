import { Request, Response, NextFunction } from 'express';
import { verifyAuthToken, TokenPayload } from '../auth/jwt';

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
  headers: Request['headers'];
  body: any;
  query: Request['query'];
  params: Request['params'];
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const customUserId = req.headers['x-user-id'] as string;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const decoded = verifyAuthToken(token);

    if (decoded) {
      req.user = decoded;
      return next();
    }
  }

  if (customUserId) {
    req.user = {
      userId: customUserId,
      email: (req.headers['x-user-email'] as string) || 'user@daysync.ai',
      name: (req.headers['x-user-name'] as string) || 'DaySync User'
    };

    return next();
  }

  next();
}

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.user || !req.user.userId) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required. Please log in to continue.'
    });
  }

  next();
}
