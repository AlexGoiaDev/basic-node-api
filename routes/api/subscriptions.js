/* eslint-disable import/order */
const router = require('express').Router();
const config = require('../../config.js');
const stripe = require('stripe')(config.stripeSecretKey);
const NoContentError = require('../../utilities/errors/NoContentError');

/**
 * Lista todas las suscripciones disponibles.
 */
router.get('/', async (req, res, next) => {
  try {
    stripe.plans.list({
      active: true,
      product: config.stripeProduct,
    },
    (err, plans) => {
      if (err) {
        res.status(500).send({
          message: 'Holi',
          err,
        });
      } else {
        let subscriptions = [];
        if (plans && plans.data && plans.data.length > 0) {
          subscriptions = plans.data.map((plan) => ({
            amount: plan.amount,
            amount_decimal: plan.amount_decimal,
            billing_scheme: plan.billing_scheme,
            currency: 'eur',
            id: plan.id,
          }));
        }
        if (subscriptions && subscriptions.length === 0) {
          return next(new NoContentError());
        }

        return res.send({
          subscriptions,
        });
      }
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
