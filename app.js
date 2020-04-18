const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const SocketIO = require('socket.io');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cookieParser());
app.use(cors({ origin: '*' }));
app.use(compression());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(express.static(path.resolve(__dirname, './public')));
app.use(errorHandler.errorHandler);
app.use('/', require('./routes'));

const server = http.createServer(app);
module.exports = server;
module.exports.io = SocketIO(server);
require('./sockets');
