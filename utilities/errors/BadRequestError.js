const ClientError = require('./ClientError');

class BadRequestError extends ClientError {
    message;
    code;
    constructor(...args) {
        super(...args);
        this.code = 400;
        this.message = args[0] || 'BadRequest';
    }
};

module.exports = BadRequestError;