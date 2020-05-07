const router = require('express').Router();
const isAuth = require('../../middlewares/isAuth');

router.use('/google-auth', require('./googleAuth'));
router.use('/user', require('./user'));
router.use('/auth', require('./auth'));
router.use('/me', require('./me'));
router.use('/payment', isAuth, require('./payment'));

module.exports = router;
