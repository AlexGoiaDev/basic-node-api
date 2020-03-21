const mongoose = require('mongoose');
const router = require('express').Router();
const User = require('../../models/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.send({
            users,
        });
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const users = await User.find({ _id: req.params.id });
        res.send({
            users,
        });
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newUser = await new User(req.body).save();
        res.send(newUser);
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