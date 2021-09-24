const express = require('express');
const resultRouter = express.Router();

resultRouter.get('/', (req, res) => {
    res.send('result page')
})

module.exports = resultRouter;