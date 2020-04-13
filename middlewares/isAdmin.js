const ForbiddenError = require('../utilities/errors/ForbiddenError');
const config = require('../config');

const { roles } = config;

module.exports = (req, res, next) => {
  if (roles === false || roles.toLowerCase() === 'false') {
    return next(null);
  }
  return next(req.user && req.user.role === 'admin' ? null : new ForbiddenError());
};
