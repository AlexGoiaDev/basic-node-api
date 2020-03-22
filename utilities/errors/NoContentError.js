const ClientError = require('./ClientError');

class NoContentError extends ClientError {
    message;
    code;
    constructor(...args) {
        super(...args);
        this.code = 204;
        this.message = args[0] || 'No content';
    }
};

module.exports = NoContentError;