const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors({ origin: '*' }));
app.use(compression());
app.use(bodyParser.json({ limit: '10mb', extended: true }));

app.use(express.static(path.resolve(__dirname, './public')));
app.use('/', require('./routes'));

app.use(errorHandler.errorHandler);

module.exports = app;
