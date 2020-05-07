/* eslint-disable import/order */
const router = require('express').Router();
const config = require('../../../config.js');
const stripe = require('stripe')(config.stripeSecretKey);
const NoContentError = require('../../../utilities/errors/NoContentError');


/**
 * Lista todos los planes disponibles.
 */
router.get('/', async (req, res, next) => {
  try {
    const plans = (await stripe.plans.list(
      {
        active: true,
        product: config.stripeProduct,
      },
    )).data.map((plan) => ({
      amount: (plan.amount / 100),
      name: plan.nickname,
      currency: 'eur',
      id: plan.id,
    }));
    if (plans && plans.length === 0) {
      return next(new NoContentError());
    }
    return res.send(plans);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
