const router = require('express').Router();

router.use('/google-auth', require('./googleAuth'));
router.use('/user', require('./user'));
router.use('/auth', require('./auth'));
router.use('/category', require('./category'));
router.use('/phrase', require('./phrase'));

module.exports = router;
