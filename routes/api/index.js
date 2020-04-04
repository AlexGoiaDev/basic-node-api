const router = require('express').Router();

router.use('/google-auth', require('./googleAuth'));
router.use('/user', require('./user'));
router.use('/auth', require('./auth'));

module.exports = router;
