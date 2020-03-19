module.exports = (req, res, next) => {
    console.log(`${new Date().toLocaleDateString('es-Es')} - ${req.method}: ${req.url}`);
    next();
};