/* eslint-disable import/order */
/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const User = require('../../models/User.model');
const NoContentError = require('../../utilities/errors/NoContentError');
const BadRequestError = require('../../utilities/errors/BadRequestError');

const isAuth = require('../../middlewares/isAuth');
const canAccess = require('../../middlewares/canAccess');
const isAdmin = require('../../middlewares/isAdmin');
const config = require('../../config');
const stripe = require('stripe')(config.stripeSecretKey);
const { sendEmail } = require('../../utilities/functions/email');

const { activateAccountUrl } = require('../../config');
// CRUD
// 1. CREATE
router.post('/', async (req, res, next) => {
  try {
    delete req.body.role; // By default you can't create admin users
    const newUser = await new User(req.body).save();
    /*
       TODO: Remove when enabled email
        await sendEmail(
          newUser.email,
          'Reset your password',
          `<a href='${activateAccountUrl + newUser.activateToken}'>Activar cuenta</a>`,
        );
        */

    return res.status(201).send(newUser.getBasicInfo());
  } catch (err) {
    return next(err);
  }
});

// 2. READ
router.get('/', isAuth, isAdmin, async (req, res, next) => {
  try {
    const users = await User.find({});
    if (users && users.length === 0) {
      throw new NoContentError();
    }
    return res.send(users);
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', isAuth, canAccess, async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    if (!user) {
      throw new NoContentError();
    }
    return res.send(user.getBasicInfo());
  } catch (err) {
    return next(err);
  }
});

// 3. UPDATE
router.put('/:id', isAuth, canAccess, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      delete req.body.role;
    }
    const userUpdated = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }, // Returns the updated document
    );
    return res.send(userUpdated.getBasicInfo());
  } catch (err) {
    return next(err);
  }
});

// 2. DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const userDeleted = await User.findByIdAndDelete({ _id: req.params.id });
    if (!userDeleted) {
      throw new BadRequestError('No user with that id');
    }
    if (userDeleted.stripeCustomerId) {
      await stripe.customers.del(userDeleted.stripeCustomerId);
    }
    return res.send(userDeleted.getBasicInfo());
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
