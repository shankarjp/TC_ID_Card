const express = require('express');
const formRouter = express.Router();
const Student = require('../models/Student');
require('dotenv').config({path:'../env/.env'});

formRouter.get('/', (req, res) => {
    res.render('form')
})

formRouter.post('/', async (req, res) => {
    try {

        // const {name, guardianName, rollNo, yearOfJoining,
        //      contactNo, guardianContact, gender, nationality, bloodGroup, department,
        //     course, address, image, sign} = req.body
        console.log(req.body);
        
        const {firstname, lastname, email, rollNo, DoB, contactNo, guardianNo,
             nationality, state, gender, bloodGroup, department, course,
              yearOfJoining, address} = req.body;

        
        // adding the data in ou db
        const newStudent = await Student.create({
            Name: firstname,
            RollNo: rollNo,
            Department: department,
            Course:course,
            Batch: yearOfJoining,
            DateOfBirth: DoB,
            BloodGroup: bloodGroup,
            Email: email,
            Address: address,
            ContactNo:contactNo,
            // Image: image // image to be added
        })


        // if student created successfully we direct then to download the pdf
        if (newStudent) {
            res.redirect('/result/'+rollNo)
            res.status(200).json({
                message: 'Student added successfully'
            })
        }
        // else we redirect to the login page saying error is there
        else {
            res.redirect('login')
            res.status(500).json({
                message: 'Server error, Try again later.'
            })
        }

    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Server error, Try again later.'
        })
    }
})

module.exports = formRouter;