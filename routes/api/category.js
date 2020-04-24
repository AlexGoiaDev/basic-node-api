/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const Category = require('../../models/Category.model');
const NoContentError = require('../../utilities/errors/NoContentError');
const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');

// CRUD
// 1. CREATE
router.post('/', async (req, res, next) => {
  try {
    const newCategory = await new Category(req.body).save();
    return res.status(201).send(newCategory);
  } catch (err) {
    return next(err);
  }
});

// 2. READ
router.get('/', async (req, res, next) => {
  try {
    const cats = await Category.find({}).populate('phrases');
    if (cats && cats.length === 0) {
      throw new NoContentError();
    }
    return res.send(cats);
  } catch (err) {
    return next(err);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    const category = await Category.findOne({ slug: req.params.slug }).populate({
      path: 'phrases',
      select: 'phrase -_id',
      options: {
        skip,
        limit,
      },
    });
    if (!category) {
      throw new NoContentError();
    }
    return res.send(category);
  } catch (err) {
    return next(err);
  }
});


// 3. UPDATE
router.put('/:id', isAuth, isAdmin, async (req, res, next) => {
  try {
    const categoryUpdated = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }, // Returns the updated document
    );
    return res.send(categoryUpdated);
  } catch (err) {
    return next(err);
  }
});

// 2. DELETE
router.delete('/:id', isAuth, isAdmin, async (req, res, next) => {
  try {
    const categoryDeleted = await Category.findByIdAndDelete({ _id: req.params.id });
    return res.send(categoryDeleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
