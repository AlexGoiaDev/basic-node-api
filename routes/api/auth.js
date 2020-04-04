const router = require('express').Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');

const config = require('../../config');

const secret = process.env.SECRET || config.secret;
const expiration = process.env.EXPIRATION || config.expiration;

/* FUNCTIONS */
// eslint-disable-next-line no-unused-vars
const { sendEmail } = require('../../utilities/functions/email');

/* MODELS */
const User = require('../../models/User');

/* ERRORS */
const BadRequestError = require('../../utilities/errors/BadRequestError');
const NoContentError = require('../../utilities/errors/NoContentError');

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return next(new BadRequestError('You must send email and password'));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError('The user does not exist.');
    }
    console.log('User');

    return res.send(user);

    /*
    User.findOne(
      { email },
      (err, user) => {
        if (err) throw err;
        if (!user) {
          next();
        } else {
          // el usuario existe
          user.comparePassword(password, (error, match) => {
            if (match && !error) {
              const token = jwt.sign(
                user.toJSON(),
                secret,
                {
                  expiresIn: expiration,
                },
              );
              res.send({
                access_token: token,
                expires_in: config.expiration,
              });
            } else {
              next(new BadRequestError('Wrong Password!'));
            }
          });
        }
      },
    );
    */
  } catch (err) {
    return next(err);
  }
});


router.post('/forget_password', async (req, res, next) => {
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
  if (user) {
    const diff = moment(new Date()).diff(user.resetPasswordTokenDate, 'm');
    if (diff <= config.maxTimeResetPass) { return true; }
  }
  return false;
};

router.get('/forget_password/:reset', async (req, res, next) => {
  try {
    const resetPasswordToken = req.params.reset;
    if (await canUpdatePassword(resetPasswordToken)) {
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

router.post('/reset_password/:reset', async (req, res, next) => {
  const { email, password } = req.body;
  const resetPasswordToken = req.params.reset;
  try {
    if (await canUpdatePassword(resetPasswordToken)) {
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
      next(new BadRequestError('You can not update the password'));
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
