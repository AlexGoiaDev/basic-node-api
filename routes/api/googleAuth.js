const router = require('express').Router();

const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const secret = process.env.SECRET || config.secret;
const expiration = process.env.EXPIRATION || config.expiration;

const clientId = process.env.GOOGLE_CLIENT_ID || config.googleClientId;
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
  const { googleToken } = req.body;
  try {
    if (!googleToken) {
      return next(new BadRequestError('You need a Google Token'));
    }
    const googleUser = await verify(googleToken);
    if (!googleUser) {
      return next(new BadRequestError('Google user not found'));
    }
    const user = await User.findOne({ email: googleUser.email });

    if (!user) {
      await new User({
        email: googleUser.email,
        password: '!-_-_-!',
        loginStrategy: 'gmail',
      }).save();
    } else if (user.loginStrategy === 'gmail') {
      throw new BadRequestError('You have to login with your email');
    }

    const token = jwt.sign(user.toJSON(), secret, { expiresIn: expiration });
    return res.send({
      access_token: token,
      expires_in: config.expiration,
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
