const logger = require('../utils/logger');
const { error } = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path,
  });

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return error(res, 'Validation failed', 400, messages);
  }
  if (err.code === 11000) {
    return error(res, 'A record with that value already exists', 409);
  }
  if (err.name === 'JsonWebTokenError') {
    return error(res, 'Invalid token', 401);
  }
  if (err.name === 'TokenExpiredError') {
    return error(res, 'Token expired', 401);
  }
  if (err.name === 'CastError') {
    return error(res, 'Invalid ID format', 400);
  }

  const statusCode = err.statusCode || 500;
  const message = statusCode < 500 ? err.message : 'Internal server error';
  return error(res, message, statusCode);
};

const notFound = (req, res) => {
  return error(res, `Route ${req.method} ${req.path} not found`, 404);
};

module.exports = { errorHandler, notFound };
