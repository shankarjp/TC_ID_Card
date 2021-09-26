// imports
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config({path:'./env/.env'});
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;

// middlewares
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

console.log(DB_URL)
// db config
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
  
const db = mongoose.connection;

db.on('error', error => console.log(error.message));
db.once('open', () => console.log('connected to database'));

// routes
const formRouter = require('./routes/form')
const resultRouter = require('./routes/result')
const homeRouter = require('./routes/home')

app.use('/', homeRouter);
app.use('/form', formRouter);
app.use('/result', resultRouter);


// port listen
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`port is on ${PORT}`))
