const app = require('./app');
const config = require('./config');
const PORT = process.env.PORT || 3000;
const DB = process.env.DB || config.db;

app.listen(PORT, '', () => {
    console.log(`Connected to port: ${PORT}!`)
    console.log(`Db: ${DB}!`)
});