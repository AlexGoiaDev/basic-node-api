const router = require('express').Router();

router.use('/google-auth', require('./googleAuth'));
router.use('/user', require('./user'));
router.use('/auth', require('./auth'));
router.use('/me', require('./me'));
router.use('/payment', require('./payment'));

module.exports = router;
