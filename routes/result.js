const express = require('express');
const resultRouter = express.Router();
const resultDetails = require('../models/Student');

resultRouter.get('/', (req, res) => {
    let resultDetail = resultDetails.find({RollNo: "11"}, function(err, resultDetail){
        if(err){
            console.log(err);
        }
        else {
            var student=resultDetail[0];
            res.render('result', {student: student})
        }
    });
})

module.exports = resultRouter;