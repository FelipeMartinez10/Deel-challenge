class ServiceError extends Error {
  constructor(message, code = 'NoErrorCodeProvided', status = 500) {
    super(message);
    this.code = code;
    this.status = status;
    Object.setPrototypeOf(this, ServiceError.prototype);
  }
}

module.exports = ServiceError;
