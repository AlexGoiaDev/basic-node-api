/* eslint-disable import/order */
const router = require('express').Router();
const config = require('../../../config.js');
const stripe = require('stripe')(config.stripeSecretKey);
const BadRequestError = require('../../../utilities/errors/BadRequestError');


router.post('/', async (req, res, next) => {
  try {
    const { plan } = req.body;
    if (!req.user.stripeCustomerId) {
      throw new BadRequestError('The user is not a client');
    }
    if (!plan) {
      throw new BadRequestError('Plan is required to create a session');
    }

    let planFound = null;
    try {
      planFound = await stripe.plans.retrieve(plan);
    } catch (err) {
      // Sospechosos
    }

    if (!planFound) {
      throw new BadRequestError('Plan not available');
    }

    const paymments = config.stripePayments.split(',');

    const session = await stripe.checkout.sessions.create(
      {
        success_url: config.stripeSuccessUrl,
        cancel_url: config.stripeCancelUrl,
        payment_method_types: paymments,
        customer: req.user.stripeCustomerId,
        subscription_data: {
          items: [
            {
              plan,
              quantity: 1,
            },
          ],
        },
      },
    );
    if (session) {
      return res.send({
        sessionId: session.id,
      });
    }
    return res.status(500).send({
      message: 'Session not created',
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
