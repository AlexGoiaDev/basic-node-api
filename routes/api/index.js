const router = require('express').Router();

const useRouterSameName = (...names) => names.forEach(name => router.use(`/${name}`, `./${name}`));

// DECLARE HERE ALL THE API ROUTES
useRouterSameName(
    'user',
    'auth'
);

module.exports = router;