const mysql = require("mysql");
// require("dotenv").config();

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

exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    const { student_id, course_id, enrollment_date } = JSON.parse(event.body);

    const sql = `INSERT INTO Enrollments (student_id, course_id, enrollment_date) 
                 VALUES (?, ?, ?)`;

    return new Promise((resolve, reject) => {
      db.query(sql, [student_id, course_id, enrollment_date], (err, result) => {
        if (err) {
          resolve({
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
          });
        } else {
          resolve({
            statusCode: 200,
            body: JSON.stringify({ message: "Student enrolled successfully!" }),
          });
        }
      });
    });
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }
};
