const {
  ValidationError,
  AuthenticationError,
  ForbiddenError,
  BadRequestError
} = require('./utils/errors');

// Logger middleware
function logger(req, res, next) {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
}

// Authentication middleware
function authenticate(req, res, next) {
  const apiKey = req.header('x-api-key');
  if (!apiKey) {
    return next(new AuthenticationError('Missing API key'));
  }
  if (apiKey !== process.env.API_KEY) {
    return next(new ForbiddenError('Invalid API key'));
  }
  next();
}

// Validation middleware for product creation/update
function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;
  if (
    typeof name !== 'string' ||
    typeof description !== 'string' ||
    typeof price !== 'number' ||
    typeof category !== 'string' ||
    typeof inStock !== 'boolean'
  ) {
    return next(new ValidationError('Validation error: Invalid product data'));
  }
  next();
}

// Error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
}

module.exports = {
  logger,
  authenticate,
  validateProduct,
  errorHandler,
};