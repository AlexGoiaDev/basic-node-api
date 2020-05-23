/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const User = require('../../models/User.model');
const NoContentError = require('../../utilities/errors/NoContentError');
const BadRequestError = require('../../utilities/errors/BadRequestError');
const isAuth = require('../../middlewares/isAuth');

// 2. READ
router.get('/', isAuth, async (req, res, next) => {
  try {
    if (req && !req.user) {
      throw new BadRequestError('Need a user to show the profile.');
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NoContentError();
    }
    return res.send(user);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
