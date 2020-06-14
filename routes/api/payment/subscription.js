/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const NoContentError = require('../../../utilities/errors/NoContentError');
const BadRequestError = require('../../../utilities/errors/BadRequestError');
const config = require('../../../config.js');
// eslint-disable-next-line import/order
const stripe = require('stripe')(config.stripeSecretKey);
const User = require('../../../models/User.model');

router.delete('/:id', async (req, res, next) => {
  try {
    // TODO: A cliente shoud only cancel their subscriptions
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError('Suscription id required');
    }

    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      throw new Error('Unknown error');
    }
    // const customer = await stripe.customers.retrive(user.stripeCustomerId);
    const customer = await stripe.customers.retrieve(user.stripeCustomerId);
    const subscription = customer.subscriptions.data.filter((s) => s.id === id);
    if (!subscription) {
      throw new BadRequestError("User don't have that subscription");
    }

    const suscriptionDeleted = await stripe.subscriptions.update(
      id,
      { cancel_at_period_end: true },
    );

    if (!suscriptionDeleted) {
      throw new NoContentError('No suscription with that id');
    }

    return res.send(suscriptionDeleted);
  } catch (err) {
    return next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    // TODO: A cliente shoud only cancel their subscriptions
    const { id } = req.params;
    const { reactivate } = req.body;
    if (!id || !reactivate) {
      throw new BadRequestError('Subscription id an reactivate option is required');
    }

    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      throw new Error('Unknown error');
    }
    // const customer = await stripe.customers.retrive(user.stripeCustomerId);
    const customer = await stripe.customers.retrieve(user.stripeCustomerId);
    const subscription = customer.subscriptions.data.filter((s) => s.id === id);
    if (!subscription) {
      throw new BadRequestError("User don't have that subscription");
    }

    const suscriptionModified = await stripe.subscriptions.update(
      id,
      { cancel_at_period_end: !!reactivate },
    );

    if (!suscriptionModified) {
      throw new NoContentError('No suscription with that id');
    }

    return res.send(suscriptionModified);
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
