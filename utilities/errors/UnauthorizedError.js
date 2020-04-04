const ClientError = require('./ClientError');

class UnauthorizedError extends ClientError {
  constructor(...args) {
    super(...args);
    this.code = 401;
    this.message = args[0] || 'Unauthorized';
  }
}

module.exports = UnauthorizedError;
