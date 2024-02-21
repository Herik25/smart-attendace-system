const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    rollNo: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

const Attendance = mongoose.model("Attendance", attendanceSchema)

module.exports = Attendance;