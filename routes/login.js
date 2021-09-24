const express = require('express');
const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
    res.send('result page')
})

module.exports = loginRouter;