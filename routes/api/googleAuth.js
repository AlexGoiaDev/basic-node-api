const router = require('express').Router();

const { OAuth2Client } = require('google-auth-library');
const config = require('../../config');

const clientId = process.env.GOOGLE_CLIENT_ID || config.googleClientId;

/* GOOGLE CLIENT */
const client = new OAuth2Client(clientId);

/* FUNCTIONS */

/* MODELS */
const User = require('../../models/User.model');

/* ERRORS */
const BadRequestError = require('../../utilities/errors/BadRequestError');
const NoContentError = require('../../utilities/errors/NoContentError');

const verify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId,
  });
  const payload = ticket.getPayload();

  return {
    nombre: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true,
  };
};

router.post('/', async (req, res, next) => {
  const { googleToken } = req.body;
  try {
    if (!googleToken) {
      return next(new BadRequestError('You need a Google Token'));
    }
    const googleUser = await verify(googleToken);
    if (googleUser) {
      return res.send(googleUser);
    }
    return next(new BadRequestError('Google user not found'));
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
