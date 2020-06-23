const router = require('express').Router();
const isAuth = require('../../../middlewares/isAuth');
router.use('/exercise', isAuth, require('./exercise'));
router.use('/session', isAuth, require('./session'));
router.use('/register', isAuth, require('./register'));

module.exports = router;
