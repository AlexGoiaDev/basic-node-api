const router = require('express').Router();
const NoContentError = require('../../../utilities/errors/NoContentError');
const BadRequestError = require('../../../utilities/errors/BadRequestError');
const config = require('../../../config.js');
// eslint-disable-next-line import/order
const stripe = require('stripe')(config.stripeSecretKey);

router.delete('/:id', async (req, res, next) => {
  try {
    // TODO: A cliente shoud only cancel their subscriptions
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError('Suscription id required');
    }
    const suscriptionDeleted = await stripe.subscriptions.update(id, { cancel_at_period_end: true });
    if (!suscriptionDeleted) {
      throw new NoContentError('No suscription with that id');
    }
    return res.send(suscriptionDeleted);
  } catch (err) {
    return next(err);
  }
});
module.exports = router;
