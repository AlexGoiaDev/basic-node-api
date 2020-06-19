const router = require('express').Router();
const isAuth = require('../../../middlewares/isAuth');

router.use('/exercise', isAuth, require('./exercise'));


module.exports = router;
