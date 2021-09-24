const express = require('express');
const app = express();


const loginRouter = require('./routes/login')
const resultRouter = require('./routes/result')
const homeRouter = require('./routes/home')


const PORT = 4000;
app.listen(PORT, () => console.log(`port is on ${PORT}`))
