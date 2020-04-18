/* eslint-disable no-underscore-dangle */
// This middleware has to be used after auth middleware
const ForbiddenError = require('../utilities/errors/ForbiddenError');

module.exports = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user._id.toString() === req.params.id)) {
    return next();
  }
  return next(new ForbiddenError());
};
