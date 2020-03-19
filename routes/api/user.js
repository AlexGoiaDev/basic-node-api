const mongoose = require('mongoose');
const router = require('express').Router();
const User = require('../../models/User');

router.get('/', (req, res) => {
    res.json({
        message: 'Hola mundo'
    });
});

router.post('/', async (req, res, next) => {
    try {
        const newUser = await new User(req.body).save();
        res.send({
            newUser,
            message: 'Ok',
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;