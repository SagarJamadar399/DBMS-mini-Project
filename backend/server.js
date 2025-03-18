const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
// require("dotenv").config();

const app = express();
app.use(cors());  // Allows cross-origin requests
app.use(express.json());  // Parses JSON request bodies

// MySQL Database Connection
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,     
//     user: process.env.DB_USER,      
//     password: process.env.DB_PASS,  
//     database: process.env.DB_NAME   
// });

const db = mysql.createConnection({
    host: "bw4ru7ftqsdasjkamdbp-mysql.services.clever-cloud.com",
    user: "u5mhsaywuymm6bw5",
    password: "nod2CR9teuQm0RABlKcs",
    database: "bw4ru7ftqsdasjkamdbp"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.message);
    } else {
        console.log("Connected to MySQL Database!");
    }
});

// API Route: Add Student
app.post("/addStudent", (req, res) => {
    const { first_name, last_name, email, enrollment_date } = req.body;

    const sql = `INSERT INTO Students (first_name, last_name, email, enrollment_date) 
                 VALUES (?, ?, ?, ?)`;

    db.query(sql, [first_name, last_name, email, enrollment_date], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "Student added successfully!" });
    });
});

// API Route: Add Course
app.post("/addCourse", (req, res) => {
    const { course_name, course_code, credits } = req.body;

    const sql = `INSERT INTO Courses (course_name, course_code, credits) 
                 VALUES (?, ?, ?)`;

    db.query(sql, [course_name, course_code, credits], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "Course added successfully!" });
    });
});

// API Route: Enroll Student in Course
app.post("/enrollStudent", (req, res) => {
    const { student_id, course_id, enrollment_date } = req.body;

    const sql = `INSERT INTO Enrollments (student_id, course_id, enrollment_date) 
                 VALUES (?, ?, ?)`;

    db.query(sql, [student_id, course_id, enrollment_date], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "Student enrolled successfully!" });
    });
});

// API Route: Get Students
app.get("/students", (req, res) => {
    db.query("SELECT * FROM Students", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// API Route: Get Courses
app.get("/courses", (req, res) => {
    db.query("SELECT * FROM Courses", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// API Route: Get Enrollments
app.get("/enrollments", (req, res) => {
    const sql = `SELECT e.enrollment_id, s.first_name, s.last_name, c.course_name, e.enrollment_date
                 FROM Enrollments e
                 JOIN Students s ON e.student_id = s.student_id
                 JOIN Courses c ON e.course_id = c.course_id`;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
