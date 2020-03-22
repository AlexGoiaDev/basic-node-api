const ForbiddenError = require('./../utilities/errors/ForbiddenError');
module.exports = (req, res, next) => {
    next(req.user && req.user.role === 'admin' ? null : new ForbiddenError());
};