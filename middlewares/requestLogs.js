/* eslint-disable no-console */
const config = require('../config');

module.exports = (req, res, next) => {
  if (config.enabledLog) {
    console.log(`${new Date().toLocaleDateString('es-Es')} - ${req.method}: ${req.url}`);
  }
  next();
};
