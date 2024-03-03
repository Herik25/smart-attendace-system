const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");
const cors = require("cors");
const Student = require("./models/student");
const Attendance = require("./models/attendance");
const Holiday = require("./models/holiday");
const Guardian = require("./models/guardian");

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

// Endpoint to fetch a student by rollNo
app.get("/students/:rollNo", async (req, res) => {
  try {
    const rollNo = req.params.rollNo;

    // Find the student by rollNo
    const student = await Student.findOne({ rollNo });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student by rollNo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint to update a student by rollNo
app.put("/students/:rollNo", async (req, res) => {
  try {
    const rollNo = req.params.rollNo;

    const {
      studentName,
      dateOfBirth,
      gender,
      address,
      phoneNumber,
      studentClass,
      guardianName,
    } = req.body;

    // Find the student by rollNo and update its information
    const updatedStudent = await Student.findOneAndUpdate(
      { rollNo },
      {
        studentName,
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        studentClass,
        guardianName,
      },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res
      .status(200)
      .json({ message: "Student updated successfully", updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Internal Server Error" });
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

    const attendanceData = await Attendance.find({ date: date }).lean();

    // Populate attendance data with class information
    for (let i = 0; i < attendanceData.length; i++) {
      const student = await Student.findOne({
        rollNo: attendanceData[i].rollNo,
      }).lean();
      if (student) {
        attendanceData[i].studentClass = student.studentClass;
      }
    }

    res.status(200).json(attendanceData);
  } catch (error) {
    res.status(500).json({ message: "error fetching attendance" });
  }
});

// Endpoint to fetch all attendance data by roll number
app.get("/attendance/:rollNo", async (req, res) => {
  try {
    const rollNo = req.params.rollNo;

    const attendanceData = await Attendance.find({ rollNo });

    res.status(200).json(attendanceData);
  } catch (error) {
    console.error("Error fetching attendance data by roll number:", error);
    res.status(500).json({ message: "Internal Server Error" });
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

    res
      .status(200)
      .json({ message: "All attendance records deleted successfully" });
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
    console.error(
      "Error generating attendance report for a single student:",
      error
    );
    res.status(500).json({ message: "Error generating the report" });
  }
});

// Endpoint to fetch holiday reports
app.get("/holiday-reports", async (req, res) => {
  try {
    const { month, year } = req.query;

    // Calculate the start and end dates for the selected month and year
    const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
      .startOf("month")
      .toDate();
    const endDate = moment(startDate).endOf("month").toDate();

    // Aggregate to find holidays within the specified month and year
    const holidays = await Holiday.aggregate([
      {
        $addFields: {
          holidayDate: { $dateFromString: { dateString: "$date" } }, // Convert date string to Date object
        },
      },
      {
        $match: {
          holidayDate: { $gte: startDate, $lte: endDate }, // Filter by date range
        },
      },
    ]);

    res.status(200).json({ holidays });
  } catch (error) {
    console.error("Error fetching holiday reports:", error);
    res.status(500).json({ message: "Error fetching holiday reports" });
  }
});
// Endpoint to add a holiday
app.post("/holidays", async (req, res) => {
  try {
    const { date, name, detail } = req.body;

    // Create a new Holiday document
    const newHoliday = new Holiday({ date, name, detail });
    await newHoliday.save();

    res
      .status(201)
      .json({ message: "Holiday added successfully", holiday: newHoliday });
  } catch (error) {
    console.error("Error adding holiday:", error);
    res.status(500).json({ message: "Failed to add holiday" });
  }
});

// delete holiday
app.delete("/holidays", async (req, res) => {
  try {
    // Delete all documents from the Attendance collection
    await Holiday.deleteMany({});

    res
      .status(200)
      .json({ message: "All attendance records deleted successfully" });
  } catch (error) {
    console.error("Error deleting attendance records:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint to check user registration by email
app.get("/check-registration/:email", async (req, res) => {
  try {
    const email = req.params.email;

    // Assuming you have a User model where user registration data is stored
    const user = await Guardian.findOne({ email });

    if (user) {
      res.status(200).json({ isRegistered: true });
    } else {
      res.status(200).json({ isRegistered: false });
    }
  } catch (error) {
    console.error("Error checking user registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint to add a guardian
app.post("/addGuardian", async (req, res) => {
  try {
    const { email, password, fullName, phoneNumber, address } = req.body;

    const newGuardian = new Guardian({
      email,
      password,
      fullName,
      phoneNumber,
      address,
    });

    await newGuardian.save();

    res
      .status(201)
      .json({ message: "Guardian added successfully", newGuardian });
  } catch (error) {
    console.error("Error adding guardian:", error);
    res.status(500).json({ message: "Failed to add guardian" });
  }
});

// GET guardian by email route
app.get("/guardians/:email", async (req, res) => {
  const { email } = req.params;
  
  try {
    // Find guardian by email
    const guardian = await Guardian.findOne({ email: email });

    if (!guardian) {
      return res.status(404).json({ error: "Guardian not found" });
    }

    return res.json(guardian);
  } catch (error) {
    console.error("Error fetching guardian:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Update guardian route
app.put("/guardians/:email", async (req, res) => {
  const { email } = req.params;
  
  try {
    // Find guardian by email and update its information
    const updatedGuardian = await Guardian.findOneAndUpdate(
      { email: email },
      req.body,
      { new: true }
    );

    if (!updatedGuardian) {
      return res.status(404).json({ error: "Guardian not found" });
    }

    return res.json(updatedGuardian);
  } catch (error) {
    console.error("Error updating guardian:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
