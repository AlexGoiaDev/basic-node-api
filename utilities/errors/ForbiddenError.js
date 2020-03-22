const ClientError = require('./ClientError');

class ForbidenError extends ClientError {
    message;
    code;
    constructor(...args) {
        super(...args);
        this.code = 403;
        this.message = args[0] || 'Forbidden';
    }
};

module.exports = ForbidenError;