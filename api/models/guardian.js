const mongoose = require('mongoose');

const guardianSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Assuming you have a Student model
  }],
});

const Guardian = mongoose.model('Guardian', guardianSchema);

module.exports = Guardian;
