const app = require('express')();
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const requestLogs = require('./middlewares/requestLogs');


app.use(cors({ origin: '*' }));
app.use(compression());
app.use(bodyParser.json({ limit: '10mb', extended: true }));

app.use('/', requestLogs, require('./routes'));

app.use(errorHandler);

module.exports = app;
