/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const Category = require('../../models/Category.model');
const NoContentError = require('../../utilities/errors/NoContentError');
const isAuth = require('../../middlewares/isAuth');
const canAccess = require('../../middlewares/canAccess');
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
router.get('/', isAuth, isAdmin, async (req, res, next) => {
  try {
    const categorys = await Category.find({});
    if (categorys && categorys.length === 0) {
      throw new NoContentError();
    }
    return res.send(categorys);
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', isAuth, canAccess, async (req, res, next) => {
  try {
    const category = await Category.findById({ _id: req.params.id });
    if (!category) {
      throw new NoContentError();
    }
    return res.send(category);
  } catch (err) {
    return next(err);
  }
});


// 3. UPDATE
router.put('/:id', isAuth, canAccess, async (req, res, next) => {
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

router.delete('/all', async (req, res, next) => {
  try {
    const categorysDeleted = await Category.deleteMany({});
    return res.send(categorysDeleted);
  } catch (err) {
    return next(err);
  }
});


router.delete('/:id', isAuth, canAccess, async (req, res, next) => {
  try {
    const categoryDeleted = await Category.findByIdAndDelete({ _id: req.params.id });
    return res.send(categoryDeleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
