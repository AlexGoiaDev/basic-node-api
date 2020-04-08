const router = require('express').Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
const bcrypt = require('bcrypt');

const config = require('../../config');

const secret = process.env.SECRET || config.secret;
const expiration = process.env.EXPIRATION || config.expiration;

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
    const token = jwt.sign(user.toJSON(), secret, { expiresIn: expiration });
    const dataToken = {
      access_token: token,
    };

    res.cookie('dataToken', dataToken, {
      expires: new Date().setTime(new Date().getTime() + expiration),
    });


    return res.send(dataToken);
  } catch (err) {
    return next(err.name === 'JsonWebTokenError' ? new UnauthorizedError(err.message) : err);
  }
});


router.post('/forget-password', async (req, res, next) => {
  try {
    const { email } = req.body;
    const resetPasswordToken = crypto.randomFillSync(Buffer.alloc(128), 0, 128).toString('hex');
    const resetPasswordTokenDate = moment();

    const user = await User.findOneAndUpdate(
      { email },
      {
        resetPasswordToken,
        resetPasswordTokenDate,
      },
      { new: true },
    );
    if (user) {
      // Send email to restore password
      res.send(user);
      /*
      const emailSent = await sendEmail(email,
        'Recovery password',
        'Pincha en este enlace para cambiar tu contraseña');
      if (emailSent.messageId) {
        res.send({
          message: 'Email sent!',
        });
      } */
    } else {
      next(new NoContentError());
    }
  } catch (err) {
    next(err);
  }
});

const canUpdatePassword = async (resetPasswordToken) => {
  const user = await User.findOne({ resetPasswordToken });
  const diff = moment(new Date()).diff(user.resetPasswordTokenDate, 'm');
  if (user && diff <= config.maxTimeResetPass) {
    return true;
  }
  return false;
};

router.get('/forget-password/:reset', async (req, res, next) => {
  try {
    const resetPasswordToken = req.params.reset;
    const canUpdate = await canUpdatePassword(resetPasswordToken);
    if (canUpdate) {
      res.send({
        message: 'Can update!',
      });
    } else {
      await User.findOneAndUpdate({ resetPasswordToken }, { resetPasswordToken: null });
      next(new BadRequestError('El token ha expirado'));
    }
  } catch (err) {
    next(err);
  }
});

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
