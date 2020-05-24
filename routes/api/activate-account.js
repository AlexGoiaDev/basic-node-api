/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const User = require('../../models/User.model');
const NoContentError = require('../../utilities/errors/NoContentError');
const BadRequestError = require('../../utilities/errors/BadRequestError');

// 2. READ
router.post('/', async (req, res, next) => {
  try {
    const { activateToken } = req.body;
    if (!activateToken) {
      throw new BadRequestError('You need an activate token');
    }

    const user = await User.findOneAndUpdate(
      { activateToken },
      {
        activated: true,
        activateToken: undefined,
      },
      { new: true },
    );

    if (!user) {
      throw new NoContentError('Token does not exist or already used');
    }

    return res.send({
      message: 'Account activated',
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
