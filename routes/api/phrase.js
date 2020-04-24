/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const Phrase = require('../../models/Phrase.model');
const NoContentError = require('../../utilities/errors/NoContentError');
const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');

// CRUD
// 1. CREATE
router.post('/', async (req, res, next) => {
  try {
    const newPhrase = await new Phrase(req.body).save();
    return res.status(201).send(newPhrase);
  } catch (err) {
    return next(err);
  }
});

// 2. READ
router.get('/', async (req, res, next) => {
  try {
    const phrases = await Phrase.find({}).populate('categories');
    if (phrases && phrases.length === 0) {
      throw new NoContentError();
    }
    return res.send(phrases);
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const phrase = await Phrase.findById({ _id: req.params.id });
    if (!phrase) {
      throw new NoContentError();
    }
    return res.send(phrase);
  } catch (err) {
    return next(err);
  }
});


// 3. UPDATE
router.put('/:id', isAuth, isAdmin, async (req, res, next) => {
  try {
    const phraseUpdated = await Phrase.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }, // Returns the updated document
    );
    return res.send(phraseUpdated);
  } catch (err) {
    return next(err);
  }
});

// 2. DELETE
router.delete('/:id', isAuth, isAdmin, async (req, res, next) => {
  try {
    const phraseDeleted = await Phrase.findByIdAndDelete({ _id: req.params.id });
    return res.send(phraseDeleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
