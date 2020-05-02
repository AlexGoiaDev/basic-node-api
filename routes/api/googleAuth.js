const router = require('express').Router();

const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const { secret, expiration } = config;

const clientId = config.googleClientId;
const client = new OAuth2Client(clientId);

/* MODELS */
const User = require('../../models/User.model');

/* ERRORS */
const BadRequestError = require('../../utilities/errors/BadRequestError');

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
  try {
    const { googleToken } = req.body;
    if (!googleToken) {
      return next(new BadRequestError('You need a Google Token'));
    }

    const googleUser = await verify(googleToken);
    if (!googleUser) {
      return next(new BadRequestError('Google user not found'));
    }

    let user = await User.findOne({ email: googleUser.email });
    if (!user) {
      user = await new User({
        email: googleUser.email,
        password: '!-_-_-!',
        loginStrategy: 'gmail',
        img: googleUser.img,
      }).save();
    }
    if (user.loginStrategy === 'email') {
      throw new BadRequestError('You have to login with your email. Not with Google.');
    }
    const token = jwt.sign(user.toJSON(), secret, { expiresIn: expiration });
    return res.send({
      access_token: token,
      expires_in: expiration,
    });
  } catch (err) {
    console.log('Error', err);
    return next(err);
  }
});

module.exports = router;
