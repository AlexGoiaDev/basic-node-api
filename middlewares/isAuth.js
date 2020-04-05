/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const config = require('../config');

const secret = process.env.SECRET || config.secret;
const auth = process.env.AUTH || config.auth;

const User = require('../models/User.model');
const BadRequestError = require('../utilities/errors/BadRequestError');
const UnauthorizedError = require('../utilities/errors/UnauthorizedError');

// Is Authenticated Midleware
const isAuth = async (req, res, next) => {
  if (auth === false || auth.toLowerCase() === 'false') { return next(); }

  try {
    const token = req.headers.authorization;
    if (!token) { throw new BadRequestError('Token required'); }
    const { _id } = jwt.verify(token, secret);
    const user = await User.findById(_id);
    if (!user) { throw new UnauthorizedError('Unauthorized'); }
    req.user = user;
    return next();
  } catch (err) {
    return next(err.name === 'JsonWebTokenError' ? new UnauthorizedError(err.message) : err);
  }
};

module.exports = isAuth;
