const router = require('express').Router();
const User = require('../../models/User');
const NoContentError = require('./../../utilities/errors/NoContentError');
const auth = require('./../../middlewares/auth');
const access = require('./../../middlewares/canAccess');

// CRUD
// 1. CREATE
router.post('/', async (req, res, next) => {
    try {
        const newUser = await new User(req.body).save();
        res.status(201).send(newUser);
    } catch (err) {
        next(err);
    }
});

// 2. READ
router.get('/', auth, async (req, res, next) => {
    try {
        const users = await User.find({});
        if (users && users.length === 0) {
            throw new NoContentError();
        }
        res.send(users);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', auth, access, async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        if (!user) {
            throw new NoContentError();
        }
        res.send(user);
    } catch (err) {
        next(err);
    }
});

// 3. UPDATE
router.put('/:id', auth, access, async (req, res, next) => {
    try {
        const userUpdated = await User.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true } // Returns the updated document
        );
        res.send(userUpdated);
    } catch (err) {
        next(err);
    }
});

// 2. DELETE
router.delete('/:id', auth, access, async (req, res, next) => {
    try {
        const userDeleted = await User.findByIdAndDelete({ _id: req.params.id });
        res.send(userDeleted);
    } catch (err) {
        next(err);
    }
});

module.exports = router;