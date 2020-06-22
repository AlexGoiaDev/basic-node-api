const router = require('express').Router();

router.use('/exercise', require('./exercise'));

module.exports = router;
