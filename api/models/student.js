const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
    unique: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  studentClass: {
    type: String,
    required: true,
  },
  guardianName: {
    type: String,
    required: true,
  }
});

const Student = mongoose.model('Student', studentSchema)

module.exports = Student