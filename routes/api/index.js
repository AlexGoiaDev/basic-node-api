const router = require('express').Router();

const useRouterSameName = (...names) => names.forEach(name => {
    console.log(`Created route /api/${name}`);
    router.use(`/${name}`, require(`./${name}`));
});

// DECLARE HERE ALL THE API ROUTES WITH THE SAME ENDPOINT AS NAMEFILE
useRouterSameName(
    'user',
    'auth'
);

module.exports = router;