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

// API Route: Add Product
app.post("/addProduct", (req, res) => {
    const { name, category, supplier, quantity, price } = req.body;

    const sql = `INSERT INTO Products (name, category_id, supplier_id, quantity_in_stock, price) 
                 VALUES (?, 
                        (SELECT category_id FROM Categories WHERE category_name=? LIMIT 1), 
                        (SELECT supplier_id FROM Suppliers WHERE supplier_name=? LIMIT 1), 
                        ?, ?)`;

    db.query(sql, [name, category, supplier, quantity, price], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "Product added successfully!" });
    });
});

// API Route: Get Products
app.get("/products", (req, res) => {
    db.query("SELECT * FROM Products", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
