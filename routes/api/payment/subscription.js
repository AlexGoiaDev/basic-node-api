/* eslint-disable import/order */
const router = require('express').Router();
const config = require('../../../config.js');
const stripe = require('stripe')(config.stripeSecretKey);
const NoContentError = require('../../../utilities/errors/NoContentError');
const BadRequestError = require('../../../utilities/errors/BadRequestError');

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
        return res.status(500).send({
          message: 'Holi',
          err,
        });
      }
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
    });
  } catch (err) {
    return next(err);
  }
});


router.post('/', async (req, res, next) => {
  const { customer, plan } = req.body;
  try {
    if (!customer || !plan) {
      throw new BadRequestError('You need to identify the customer and the plan to suscripe');
    }
    stripe.subscriptions.create(
      {
        customer: 'cus_HCll7x2g5pJCwU',
        items: [{ plan }],
      },
      (err, subscription) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.send(subscription);
      },
    );
  } catch (err) {
    return next(err);
  }
});


router.post('/me', (req, res, next) => {
  const { email } = req.body;
  console.log('Email', email);
  try {
    if (!email) {
      return next(new BadRequestError('Yo must provide your email'));
    }
    stripe.customers.list({
      email,
    }, (err, customer) => {
      if (err) {
        return res.send(err);
      }
      return res.send(customer);
    });
  } catch (err) {
    return next(err);
  }
});

router.post('/create', (req, res, next) => {
  const { } = req.body;
});


module.exports = router;
