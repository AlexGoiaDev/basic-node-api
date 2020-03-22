// This middleware has to be used after auth middleware
module.exports = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.id === req.params.id)) {
        next();
    }
    res.status(403).send({
        message: 'Forbidden',
    });
};