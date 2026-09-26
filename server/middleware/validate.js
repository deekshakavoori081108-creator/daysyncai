export function validateBody(schema) {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req.body);
      req.validatedBody = parsed;
      next();
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: err.errors ? err.errors.map(e => `${e.path.join('.')}: ${e.message}`) : [err.message]
      });
    }
  };
}
