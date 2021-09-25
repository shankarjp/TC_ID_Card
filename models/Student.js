const mongoose = require('mongoose');


const StudentSchema = new mongoose.Schema({
    Name: String,
    RollNo: Number,
    Department: String,
    Batch: Number,
    DateOfBirth: String,
    BloodGroup: String,
    Email: String,
    Address: String,
    ContactNo: String,
    Image: Buffer
})

module.exports = mongoose.model('Student', StudentSchema)