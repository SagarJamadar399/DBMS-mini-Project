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

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.message);
    } else {
        console.log("Connected to MySQL Database!");
    }
});

exports.handler = async (event, context) => {
    // Handle POST requests
    if (event.httpMethod === "POST") {
        const { name, category, supplier, quantity, price } = JSON.parse(event.body);

        const sql = `INSERT INTO Products (name, category_id, supplier_id, quantity_in_stock, price) 
                     VALUES (?, 
                            (SELECT category_id FROM Categories WHERE category_name=? LIMIT 1), 
                            (SELECT supplier_id FROM Suppliers WHERE supplier_name=? LIMIT 1), 
                            ?, ?)`;

        return new Promise((resolve, reject) => {
            db.query(sql, [name, category, supplier, quantity, price], (err, result) => {
                if (err) {
                    reject({
                        statusCode: 500,
                        body: JSON.stringify({ error: err.message })
                    });
                }
                resolve({
                    statusCode: 200,
                    body: JSON.stringify({ message: "Product added successfully!" })
                });
            });
        });
    }

    // If not POST, return an error
    return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" })
    };
};
