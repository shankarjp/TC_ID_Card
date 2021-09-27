const mongoose = require('mongoose');


const StudentSchema = new mongoose.Schema({
    Name: String,
    RollNo: String,
    Department: String,
    Batch: String,
    Course: String,
    DateOfBirth: String,
    BloodGroup: String,
    Email: String,
    Address: String,
    ContactNo: String,
    image: {
        type: 'buffer',
        required: true
    },
    imagetype: {
        type: 'string',
        required: true
    },
})

module.exports = mongoose.model('Student', StudentSchema)