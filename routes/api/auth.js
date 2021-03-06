const router = require('express').Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
const bcrypt = require('bcrypt');

const config = require('../../config');

const { secret, expiration } = config;

const UnauthorizedError = require('../../utilities/errors/UnauthorizedError');

/* FUNCTIONS */
// eslint-disable-next-line no-unused-vars
const { sendEmail } = require('../../utilities/functions/email');

/* MODELS */
const User = require('../../models/User.model');

/* ERRORS */
const BadRequestError = require('../../utilities/errors/BadRequestError');
const NoContentError = require('../../utilities/errors/NoContentError');

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) { return next(new BadRequestError('You must send email and password')); }

  try {
    const user = await User.findOne({ email });
    if (!user || (user && !bcrypt.compareSync(password, user.password))) {
      throw new BadRequestError('Wrong email or password');
    }
    const token = jwt.sign(user.toJSON(), secret, { expiresIn: Number(expiration) });
    const dataToken = {
      access_token: token,
      expires_in: config.expiration,
    };
    return res.send(dataToken);
  } catch (err) {
    return next(err.name === 'JsonWebTokenError' ? new UnauthorizedError(err.message) : err);
  }
});


router.post('/recovery-email', async (req, res, next) => {
  try {
    const { email } = req.body;
    const resetPasswordToken = crypto.randomFillSync(Buffer.alloc(128), 0, 128).toString('hex');
    const resetPasswordTokenDate = moment().toDate();

    const user = await User.findOneAndUpdate(
      { email },
      {
        resetPasswordToken,
        resetPasswordTokenDate,
      },
      { new: true },
    );
    if (user) {
      // TODO: Mejorar visualmente este apartado
      // Send email to restore password
      const emailSent = await sendEmail(email,
        'Reset your password',
        `Enlace de recuperación: <a href='${config.recoverUrl + resetPasswordToken}'>Recuperar contraseña</a>`);
      if (emailSent.messageId) {
        return res.send({
          message: 'Recovery email sent!',
          resetPasswordToken,
        });
      }
      return res.status(500).send({
        message: 'Email not sent',
      });
    }
    return next(new NoContentError());
  } catch (err) {
    return next(err);
  }
});

const canUpdatePassword = async (resetPasswordToken) => {
  const user = await User.findOne({ resetPasswordToken });
  if (user) {
    const diff = moment(new Date()).diff(user.resetPasswordTokenDate, 'm');
    if (diff <= config.maxTimeResetPass) {
      return true;
    }
  }
  return false;
};

router.post('/reset-password/:reset', async (req, res, next) => {
  const { email, password } = req.body;
  const resetPasswordToken = req.params.reset;
  try {
    const canUpdate = await canUpdatePassword(resetPasswordToken);
    if (canUpdate) {
      const userUpdated = await User.findOneAndUpdate(
        { email },
        { password, resetPasswordToken: null },
      );
      if (userUpdated) {
        res.send({
          message: 'User updated',
        });
      } else {
        next(new BadRequestError('Password not modified'));
      }
    } else {
      next(new BadRequestError('Url expired or already used.'));
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
