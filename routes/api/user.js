const mongoose = require('mongoose');
const router = require('express').Router();
const User = require('../../models/User');
const NoContentError = require('./../../utilities/errors/NoContentError');


router.get('/', async (req, res, next) => {
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

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            throw new NoContentError();
        }
        res.send(user);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newUser = await new User(req.body).save();
        res.status(201).send(newUser);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const userDeleted = await User.findByIdAndDelete({ _id: req.params.id });
        res.send(userDeleted);
    } catch (err) {
        next(err);
    }
});

module.exports = router;