const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');


app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static("public"));

const formRouter = require('./routes/form')
const resultRouter = require('./routes/result')
const homeRouter = require('./routes/home')

app.use('/', homeRouter);
app.use('/form', formRouter);
app.use('/result', resultRouter);

const PORT = 4000;
app.listen(PORT, () => console.log(`port is on ${PORT}`))
