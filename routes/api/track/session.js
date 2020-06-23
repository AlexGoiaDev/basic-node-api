/* eslint-disable import/order */
/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const Session = require('../../../models/track/Session.model');
const NoContentError = require('../../../utilities/errors/NoContentError');

// CRUD
// 1. CREATE
router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    body.createdBy = req.user._id;
    const newSession = await new Session(req.body).save();
    return res.status(201).send(newSession);
  } catch (err) {
    return next(err);
  }
});

// 2. READ
router.get('/', async (req, res, next) => {
  try {
    const sessions = await Session.find();
    if (sessions && sessions.length === 0) {
      throw new NoContentError();
    }
    return res.send(sessions);
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const session = await Session.findById({ _id: req.params.id });
    if (!session) {
      throw new NoContentError();
    }
    return res.send(session);
  } catch (err) {
    return next(err);
  }
});

// 3. UPDATE
router.put('/:id', async (req, res, next) => {
  try {
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
    const sessionDeleted = await Session.findByIdAndDelete({ _id: req.params.id });
    return res.send(sessionDeleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
