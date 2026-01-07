const logger = require('./logging');

function errorHandler(err, req, res, next) {
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
    timestamp: new Date(),
    path: req.path
  });
}

module.exports = { errorHandler };
