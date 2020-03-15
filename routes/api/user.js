const mongoose = require('mongoose');
const router = require('express').Router();
const User = require('../../models/User');

router.get('/', (req, res) => {
    res.json({
        message: 'Hola mundo'
    });
});

module.exports = router;