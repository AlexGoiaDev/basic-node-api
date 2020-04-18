/* eslint-disable no-console */
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

const PORT = process.env.PORT || config.port;
const DB = process.env.DB || config.db;
const HOST = process.env.HOST || config.host;
const DB_USER = process.env.DB_USER || config.dbUser;
const DB_PASSWORD = process.env.DB_PASSWORD || config.dbPassword;

const connectToDb = () => {
  mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${HOST}/${DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
  )
    .then(() => {
      console.log('Connected to db!');
    })
    .catch((err) => {
      console.error('Error. ', err);
    });
};

app.listen(PORT, '', async () => {
  console.log(`Connected to port: ${PORT}!`);
  connectToDb();
});
