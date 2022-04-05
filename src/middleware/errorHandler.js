const { StatusCodes } = require('http-status-codes');
const logger = require('../logger');
const ServiceError = require('../utils/ServiceError');

function handler(error, _, res, next) {
  if (error instanceof ServiceError) {
    logger.warn(`A Service error has been handled: ${error.message}`);
    res
      .status(error.status)
      .json({
        code: error.code,
        message: error.message,
      });
  } else {
    logger.error(`An unhandled error has been handled, details are: ${error.name}-${error.message}: ${error.stack}`);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        code: 'InternalServerError',
        message: 'An unexpected error has ocurred',
      });
  }

  return next();
}

module.exports = handler;
