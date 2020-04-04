/* eslint-disable no-underscore-dangle */

const jwt = require('jsonwebtoken');
const config = require('../config');

const secret = process.env.SECRET || config.secret;
const User = require('../models/User');

// Is Authenticated Midleware
const isAuth = (req, res, next) => {
  if (config.auth === false) {
    next();
  } else {
    const token = req.headers.authorization;
    if (!token) {
      res.status(400).json({
        message: 'Necesitas un token para acceder a este recurso.',
      });
    }

    jwt.verify(
      token,
      secret,
      (err, playlaod) => {
        if (err) {
          res.status(401).json({
            message: `Error: ${err.message}`,
          });
        }
        User.findById(
          playlaod._id,
          (userError, user) => {
            if (userError) {
              return res.status(401).send({ message: `Error: ${err}` });
            }
            req.user = user;
            return next();
          },
        );
      },
    );
  }
};

module.exports = isAuth;
