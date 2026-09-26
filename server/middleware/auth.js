// Authentication and Session Context Middleware
export function authMiddleware(req, res, next) {
  // Extract user identity from Authorization header or session/header token
  const authHeader = req.headers.authorization;
  const userHeader = req.headers['x-user-id'];

  if (userHeader) {
    req.user = {
      id: Number(userHeader),
      username: req.headers['x-user-name'] || 'Student Innovator',
      email: req.headers['x-user-email'] || 'innovator@sanskritiplay.org'
    };
  } else if (authHeader && authHeader.startsWith('Bearer ')) {
    // Simulated token decoding
    req.user = {
      id: 1,
      username: 'archaeo_guild',
      email: 'guild@sanskritiplay.org'
    };
  } else {
    // Default guest/student context
    req.user = {
      id: 1,
      username: 'Guest Innovator',
      email: 'guest@sanskritiplay.org'
    };
  }

  next();
}

export function requireAuth(req, res, next) {
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required to perform this action.'
    });
  }
  next();
}
