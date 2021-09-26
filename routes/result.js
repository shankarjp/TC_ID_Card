const express = require('express');
const resultRouter = express.Router();
const resultDetails = require('../models/Student');

resultRouter.get('/:studentId', (req, res) => {
    const rollno = req.params.studentId+"";
    let resultDetail = resultDetails.find({RollNo: rollno}, function(err, resultDetail){
        if(err){
            console.log(err);
        }
        else {
            //get last/ latest detail
            var student = resultDetail[resultDetail.length - 1];
            res.render('result', {student: student})
        }
    });
})

module.exports = resultRouter;