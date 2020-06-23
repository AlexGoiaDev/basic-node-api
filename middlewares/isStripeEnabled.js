const { stripeEnabled } = require('../config');

const isStripeEnabled = (req, res, next) => {
  if (stripeEnabled) {
    return next();
  }
  return res.status(404);
};

module.exports = isStripeEnabled;
