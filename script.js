// imports
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config({path:'./env/.env'});
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const passport = require('passport')

// middlewares
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended: false, limit: '500kb'}));
app.use(express.json());

// db config
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
  
const db = mongoose.connection;

db.on('error', error => console.log(error.message));
db.once('open', () => console.log('connected to database'));

app.use(require('cookie-parser')());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize())
app.use(passport.session())

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
