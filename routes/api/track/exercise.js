/* eslint-disable import/order */
/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const Exercise = require('../../../models/track/Exercise.model');
const NoContentError = require('../../../utilities/errors/NoContentError');

// CRUD
// 1. CREATE
router.post('/', async (req, res, next) => {
  try {
    const newExercise = await new Exercise(req.body).save();
    return res.status(201).send(newExercise);
  } catch (err) {
    return next(err);
  }
});

// 2. READ
router.get('/', async (req, res, next) => {
  try {
    const exercises = await Exercise.find();
    if (exercises && exercises.length === 0) {
      throw new NoContentError();
    }
    return res.send(exercises);
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const exercise = await Exercise.findById({ _id: req.params.id });
    if (!exercise) {
      throw new NoContentError();
    }
    return res.send(exercise);
  } catch (err) {
    return next(err);
  }
});

// 3. UPDATE
router.put('/:id', async (req, res, next) => {
  try {
    const exerciseUpdated = await Exercise.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }, // Returns the updated document
    );
    return res.send(exerciseUpdated);
  } catch (err) {
    return next(err);
  }
});

// 2. DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const exerciseDeleted = await Exercise.findByIdAndDelete({ _id: req.params.id });
    return res.send(exerciseDeleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
