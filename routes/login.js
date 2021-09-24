const express = require('express');
const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
    res.render('login')
})

module.exports = loginRouter;