const app = require('express')();
app.use('/', require('./routes'));
module.exports = app;