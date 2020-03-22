const router = require('express').Router();

const hidePswd = (req, res, next) => {
    console.log('La respuesta tiene password', res.password);
    next();
};

const useRouterSameName = (...names) => names.forEach(name => {
    console.log(`Created route /api/${name}`);
    router.use(`/${name}`, require(`./${name}`));
});

// DECLARE HERE ALL THE API ROUTES WITH THE SAME ENDPOINT AS NAMEFILE
useRouterSameName(
    'user',
    'auth',
);

module.exports = router;