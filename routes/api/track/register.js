/* eslint-disable import/order */
/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const Register = require('../../../models/track/Register.model');
const Session = require('../../../models/track/Session.model');
const NoContentError = require('../../../utilities/errors/NoContentError');
const BadRequestError = require('../../../utilities/errors/BadRequestError');

// CRUD
// 1. CREATE
router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    if (!body.session) {
      throw new BadRequestError('Session id rqequired');
    }
    const newRegister = await new Register(req.body).save();
    Session.findByIdAndUpdate(
      { _id: newRegister._id },
      {
        $push: {
          registers: newRegister._id,
        },
      },
      { upsert: true },
    );
    return res.status(201).send(newRegister);
  } catch (err) {
    return next(err);
  }
});

// 2. READ
router.get('/', async (req, res, next) => {
  try {
    const registers = await Register.find();
    if (registers && registers.length === 0) {
      throw new NoContentError();
    }
    return res.send(registers);
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const register = await Register.findById({ _id: req.params.id });
    if (!register) {
      throw new NoContentError();
    }
    return res.send(register);
  } catch (err) {
    return next(err);
  }
});

// 3. UPDATE
router.put('/:id', async (req, res, next) => {
  try {
    const registerUpdated = await Register.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }, // Returns the updated document
    );
    return res.send(registerUpdated);
  } catch (err) {
    return next(err);
  }
});

// 2. DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const registerDeleted = await Register.findByIdAndDelete({ _id: req.params.id });
    return res.send(registerDeleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
