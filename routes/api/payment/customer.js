/* eslint-disable no-underscore-dangle */
/* eslint-disable import/order */
const router = require('express').Router();
const config = require('../../../config.js');
const stripe = require('stripe')(config.stripeSecretKey);
const NoContentError = require('../../../utilities/errors/NoContentError');
const BadRequestError = require('../../../utilities/errors/BadRequestError');
const User = require('../../../models/User.model');
const canAccess = require('../../../middlewares/canAccess');


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
    return res.send(userUpdated.getBasicInfo());
  } catch (err) {
    return next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      throw new NoContentError();
    }
    // const customer = await stripe.customers.retrive(user.stripeCustomerId);
    const customer = await stripe.customers.retrieve(user.stripeCustomerId);
    return res.send(customer);
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', canAccess, async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    if (!user) {
      throw new NoContentError();
    }
    // const customer = await stripe.customers.retrive(user.stripeCustomerId);
    const customer = await stripe.customers.retrieve(user.stripeCustomerId);
    return res.send(customer);
  } catch (err) {
    return next(err);
  }
});

// Delete: We shoud delete the customer when deleting a user

module.exports = router;
