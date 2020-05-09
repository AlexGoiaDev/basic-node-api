const router = require('express').Router();
const isAuth = require('../../../middlewares/isAuth');

router.use('/customer', isAuth, require('./customer'));
router.use('/session', isAuth, require('./session'));
router.use('/plans', require('./plans'));

module.exports = router;
