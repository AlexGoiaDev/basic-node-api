const app = require('express')(),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    errorHandler = require('./middlewares/errorHandler'),
    requestLogs = require('./middlewares/requestLogs');

app.use(cors({ origin: '*' }));
app.use(compression());
app.use(bodyParser.json({ limit: '10mb', extended: true }));

app.use('/', requestLogs, require('./routes'));
app.use(errorHandler);

module.exports = app;