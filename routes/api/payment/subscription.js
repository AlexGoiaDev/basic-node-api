const router = require('express').Router();
const NoContentError = require('../../../utilities/errors/NoContentError');
const BadRequestError = require('../../../utilities/errors/BadRequestError');
const config = require('../../../config.js');
// eslint-disable-next-line import/order
const stripe = require('stripe')(config.stripeSecretKey);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError('Suscription id required');
    }
    const suscriptionDeleted = await stripe.subscriptions.del(id);
    if (!suscriptionDeleted) {
      throw new NoContentError('No suscription with that id');
    }
    return res.send(suscriptionDeleted);
  } catch (err) {
    return next(err);
  }
});
module.exports = router;
