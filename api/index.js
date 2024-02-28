const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");
const cors = require("cors");
const Student = require("./models/student");
const Attendance = require("./models/attendance");

const app = express();
const port = 8080;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://harsh:harsh@cluster0.8gqw6r7.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("databae connected!");
  })
  .catch((err) => {
    console.log("error connecting to Mongo : ", err);
  });

app.listen(port, () => {
  console.log("server is listening on port ", port);
});

// endpoitn to register a student
app.post("/addStudent", async (req, res) => {
  try {
    const {
      rollNo,
      studentName,
      dateOfBirth,
      gender,
      address,
      phoneNumber,
      studentClass,
      guardianName,
    } = req.body;

    console.log(rollNo);

    // create a new student
    const newStudent = new Student({
      rollNo,
      studentName,
      dateOfBirth,
      gender,
      address,
      phoneNumber,
      studentClass,
      guardianName,
    });
    try {
      await newStudent.save();
    } catch (error) {
      console.log("hehe error: ", error);
    }

    res
      .status(201)
      .json({ message: "Student saved successfully!", student: newStudent });
  } catch (error) {
    res.status(500).json({ message: "Can't save the student" });
    console.log("Error crating a student");
  }
});

// endpoitn to fetch all the studetns
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve the students" });
  }
});

// endpoint for attendance
app.post("/attendance", async (req, res) => {
  try {
    const { rollNo, studentName, date, status, subject, time } = req.body;

    const existingAttendance = await Attendance.findOne({
      rollNo,
      date,
      subject,
    });

    if (existingAttendance) {
      existingAttendance.status = status;
      await existingAttendance.save();
      res.status(200).json(existingAttendance);
    } else {
      const newAttendance = await Attendance({
        rollNo,
        studentName,
        date,
        status,
        subject,
        time,
      });

      await newAttendance.save();

      res.status(200).json(newAttendance);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to mark the attendance" });
  }
});

app.get("/attendance", async (req, res) => {
  try {
    const { date } = req.query;

    const attendanceData = await Attendance.find({ date: date });

    res.status(200).json(attendanceData);
  } catch (error) {
    res.status(500).json({ message: "error fetching attendance" });
  }
});

app.get("/attendance-report-all-students", async (req, res) => {
  try {
    const { month, year } = req.query;

    console.log("Query parameters:", month, year);
    // Calculate the start and end dates for the selected month and year
    const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
      .startOf("month")
      .toDate();
    const endDate = moment(startDate).endOf("month").toDate();

    // Aggregate attendance data for all students and date range
    const report = await Attendance.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  { $month: { $dateFromString: { dateString: "$date" } } },
                  parseInt(req.query.month),
                ],
              },
              {
                $eq: [
                  { $year: { $dateFromString: { dateString: "$date" } } },
                  parseInt(req.query.year),
                ],
              },
            ],
          },
        },
      },

      {
        $group: {
          _id: "$rollNo",
          present: {
            $sum: {
              $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
            },
          },
          absent: {
            $sum: {
              $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
            },
          },
          halfday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 },
            },
          },
          holiday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 },
            },
          },
        },
      },
      {
        $lookup: {
          from: "students", // Name of the students collection
          localField: "_id",
          foreignField: "rollNo",
          as: "studentDetails",
        },
      },
      {
        $unwind: "$studentDetails", // Unwind the studentDetails array
      },
      {
        $project: {
          _id: 1,
          present: 1,
          absent: 1,
          halfday: 1,
          name: "$studentDetails.studentName",
          className: "$studentDetails.studentClass",
          addresses: "$studentDetails.address",
          rollNo: "$studentDetails.rollNo",
        },
      },
    ]);

    res.status(200).json({ report });
  } catch (error) {
    console.error("Error generating attendance report:", error);
    res.status(500).json({ message: "Error generating the report" });
  }
});

// Endpoint to delete a student by rollNo
app.delete("/students/:rollNo", async (req, res) => {
  try {
    const rollNo = req.params.rollNo;

    // Find the student by rollNo and delete it
    await Student.findOneAndDelete({ rollNo });

    // Delete the attendance records for the student
    await Attendance.deleteMany({ rollNo });

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint to delete all attendance records
app.delete("/attendance", async (req, res) => {
  try {
    // Delete all documents from the Attendance collection
    await Attendance.deleteMany({});

    res.status(200).json({ message: "All attendance records deleted successfully" });
  } catch (error) {
    console.error("Error deleting attendance records:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// fetching attendance for a sungle student for guardians section 

app.get("/attendance-report-single-student", async (req, res) => {
  try {
    const { rollNo, name, month, year } = req.query;

    console.log("Query parameters:", rollNo, name, month, year);
    
    // Calculate the start and end dates for the selected month and year
    const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
      .startOf("month")
      .toDate();
    const endDate = moment(startDate).endOf("month").toDate();

    // Aggregate attendance data for the specified student and date range
    const report = await Attendance.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  { $month: { $dateFromString: { dateString: "$date" } } },
                  parseInt(month),
                ],
              },
              {
                $eq: [
                  { $year: { $dateFromString: { dateString: "$date" } } },
                  parseInt(year),
                ],
              },
              { $eq: ["$rollNo", rollNo] },
              { $eq: ["$studentName", name] },
            ],
          },
        },
      },
      {
        $group: {
          _id: "$rollNo",
          present: {
            $sum: {
              $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
            },
          },
          absent: {
            $sum: {
              $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
            },
          },
          halfday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 },
            },
          },
          holiday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 },
            },
          },
        },
      },
      {
        $lookup: {
          from: "students", // Name of the student collection
          localField: "_id",
          foreignField: "rollNo",
          as: "studentDetails",
        },
      },
      {
        $unwind: "$studentDetails", // Unwind the studentDetails array
      },
      {
        $project: {
          _id: 1,
          present: 1,
          absent: 1,
          halfday: 1,
          name: "$studentDetails.studentName",
          className: "$studentDetails.studentClass",
          addresses: "$studentDetails.address",
          rollNo: "$studentDetails.rollNo",
        },
      },
    ]);

    res.status(200).json({ report });
  } catch (error) {
    console.error("Error generating attendance report for a single student:", error);
    res.status(500).json({ message: "Error generating the report" });
  }
});

