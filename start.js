/* eslint-disable no-console */
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

const {
  PORT, DB, HOST, DB_PASSWORD, DB_USER,
} = config;

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
