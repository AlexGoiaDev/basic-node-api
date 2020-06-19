/* eslint-disable import/order */
/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const Session = require('../../../models/register/Session.model');
const Register = require('../../../models/register/Register.model');
const NoContentError = require('../../../utilities/errors/NoContentError');
const BadRequestError = require('../../../utilities/errors/BadRequestError');

const isAuth = require('../../../middlewares/isAuth');
const canAccess = require('../../../middlewares/canAccess');
const isAdmin = require('../../../middlewares/isAdmin');
const config = require('../../../config');
const stripe = require('stripe')(config.stripeSecretKey);

// CRUD
// 1. CREATE
router.post('/', isAuth, async (req, res, next) => {
  try {
    console.log('Req.user', req.user._id);
    const { session } = req.body;

    if (session && session.registers && session.registers.length > 0) {
      session.registers.forEach(async (element) => {
        await new Register(element).save();
      });
    }

    const newSession = await new Session(session).save();

    // Crear la sesión
    return res.status(201).send();
  } catch (err) {
    return next(err);
  }
});

// 2. READ
router.get('/', isAuth, isAdmin, async (req, res, next) => {
  try {
    const users = await Session.find({});
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
    const user = await Session.findById({ _id: req.params.id });
    if (!user) {
      throw new NoContentError();
    }
    return res.send(user.getBasicInfo());
  } catch (err) {
    return next(err);
  }
});

// 3. UPDATE
router.put('/:id', isAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError('No session id provided');
    }
    const sessionUpdated = await Session.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }, // Returns the updated document
    );
    return res.send(sessionUpdated);
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
