const ForbiddenError = require('../utilities/errors/ForbiddenError');
const config = require('../config');

module.exports = (req, res, next) => {
  if (config.roles === false) {
    return next(null);
  }
  return next(req.user && req.user.role === 'admin' ? null : new ForbiddenError());
};
