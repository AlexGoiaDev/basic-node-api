/* eslint-disable no-underscore-dangle */
/* eslint-disable import/order */
const router = require('express').Router();
const config = require('../../../config.js');
const stripe = require('stripe')(config.stripeSecretKey);
const NoContentError = require('../../../utilities/errors/NoContentError');
const BadRequestError = require('../../../utilities/errors/BadRequestError');
const User = require('../../../models/User.model');

router.post('/', async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      throw BadRequestError('You need an email to create a customer');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new NoContentError('There is no user with that email');
    }

    if (user.stripeCustomerId) {
      throw new BadRequestError('The user is already a customer');
    }

    const customer = await stripe.customers.create({
      email,
    });
    const userUpdated = await User.findByIdAndUpdate(
      { _id: user._id },
      { stripeCustomerId: customer.id },
      { new: true },
    );
    return res.send(userUpdated);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
