const express = require('express');
const homeRouter = express.Router();
const Student = require('../models/Student');
require('dotenv').config({path:'../env/.env'});



homeRouter.get('/', (req, res) => {
    res.render('home')
})

homeRouter.post('/portal', async (req, res) => {
    try {

        const {name, guardianName, rollNo, yearOfJoining,
             contactNo, guardianContact, gender, nationality, bloodGroup, department,
            course, address, image, sign} = req.body
        

        // adding the data in ou db
        const newStudent = await Student.create({
            Name: name,
            RollNo: Number(rollNo),
            Department: department,
            Batch: yearOfJoining,
            DateOfBirth: dateOfBirth,
            BloodGroup: bloodGroup,
            Email: email,
            Address: address,
            contactNo:contactNo,
            Image: image // image to be added
        })


        // if student created successfully we direct then to download the pdf
        if (newStudent) {
            res.redirect('result')
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

module.exports = homeRouter;