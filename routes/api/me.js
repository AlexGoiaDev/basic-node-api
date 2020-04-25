/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const User = require('../../models/User.model');
const NoContentError = require('../../utilities/errors/NoContentError');
const isAuth = require('../../middlewares/isAuth');

// 2. READ
router.get('/', isAuth, async (req, res, next) => {
  try {
    console.log('Req user', req.user);
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
