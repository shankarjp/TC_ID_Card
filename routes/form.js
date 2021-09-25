const express = require('express');
const formRouter = express.Router();

formRouter.get('/', (req, res) => {
    res.render('form')
})

module.exports = formRouter;