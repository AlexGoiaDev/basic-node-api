const router = require('express').Router();
// DECLARE HERE ALL THE API ROUTES
router.use('/user', require('./user/user.route'));
module.exports = router;