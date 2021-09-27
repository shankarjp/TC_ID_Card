const express = require('express');
const formRouter = express.Router();
const Student = require('../models/Student');
require('dotenv').config({path:'../env/.env'});
const passport = require('passport');
const auth = require('../middleware/auth')


// to check if images is of these types
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']


// to using static files
formRouter.use(express.static('public'));


// to read the image data an save it in buffer format
function saveImage(student, imageEncoded) {
    if (imageEncoded == null) return
    const img = JSON.parse(imageEncoded);
     if (img != null && imageMimeTypes.includes(img.type)) {
        student.image = new Buffer.from(img.data, 'base64');
        student.imagetype = img.type;
     }
}


formRouter.get('/', auth, (req, res) => {
    res.render('form', {
        rollnumber: req.user.email.split('@')[0],
        email: req.user.email,
        name: req.user.name,
        phone: req.user.phoneNumber
    })
})


   
formRouter.post('/', async (req, res) => {
    try {

        console.log(req.body);
        
        const {firstname, lastname, email, rollNo, DoB, contactNo, guardianNo,
             nationality, state, gender, bloodGroup, department, course, image,
              yearOfJoining, address} = req.body;


        // const image = {
        //         data: fs.readFileSync(path.join(process.cwd() + '/uploads/' + req.file.filename)),
        //         contentType: 'image/png'
        //     }


        // adding the data in ou db

        

        const newStudent = new Student({
            Name: firstname,
            RollNo: rollNo,
            Department: department,
            Course:course,
            Batch: yearOfJoining,
            DateOfBirth: DoB,
            BloodGroup: bloodGroup,
            Email: email,
            Address: address,
            ContactNo:contactNo
        })

        saveImage(newStudent, image)

        newStudent.save()
            .then(student => {
                if (student) {
                    res.redirect('/result/' + rollNo)
                    res.status(200).json({
                    message: 'Student added successfully'
                    })
                }else {
                    res.redirect('login')
                    res.status(500).json({
                        message: 'Server error, Try again later.'
                    })
                }
                
            })
            .catch(err => console.log(err));



        // if student created successfully we direct then to download the pdf

        // the redirect route is unique for every student
        // if (newStudent) {
        //     res.redirect('/result/' + rollNo)
        //     res.status(200).json({
        //         message: 'Student added successfully'
        //     })
        // }

        // // else we redirect to the login page saying error is there
        // else {
        //     res.redirect('login')
        //     res.status(500).json({
        //         message: 'Server error, Try again later.'
        //     })
        // }

    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Server error, Try again later.'
        })
    }
})

module.exports = formRouter;