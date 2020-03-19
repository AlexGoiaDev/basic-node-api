const
    app = require('./app'),
    config = require('./config'),
    PORT = process.env.PORT || config.port,
    DB = process.env.DB || config.db,
    HOST = process.env.HOST || config.host,
    DB_USER = process.env.DB_USER || config.dbUser,
    DB_PASSWORD = process.env.DB_PASSWORD || config.dbPassword,
    mongoose = require('mongoose');

const connectToDb = () => {
    mongoose.connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${HOST}/${DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        .then(() => {
            console.log('Connected to db!')
        })
        .catch((err) => {
            console.error('Error. ', err);
        });
};


app.listen(PORT, '', async () => {
    console.log(`Connected to port: ${PORT}!`)
    connectToDb();
});