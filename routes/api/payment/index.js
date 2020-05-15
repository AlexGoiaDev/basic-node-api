const router = require('express').Router();
const isAuth = require('../../../middlewares/isAuth');

router.use('/customer', isAuth, require('./customer'));
router.use('/session', isAuth, require('./session'));
router.use('/plans', require('./plans'));
router.use('/subscription', isAuth, require('./subscription'));

module.exports = router;
