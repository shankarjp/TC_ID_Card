const express = require('express');
const resultRouter = express.Router();
const resultDetails = require('../models/Student');

resultRouter.get('/', (req, res) => {
    res.render('result')
    let resultDetail = resultDetails.find({RollNo: "2131231"}, function(err, resultDetail){
        if(err){
            console.log(err);
        }
        else {
            console.log(resultDetail);
        }
    });
})

module.exports = resultRouter;