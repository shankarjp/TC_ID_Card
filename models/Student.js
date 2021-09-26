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
    Image: Buffer
})

module.exports = mongoose.model('Student', StudentSchema)