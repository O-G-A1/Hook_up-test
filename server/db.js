const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Default XAMPP MySQL username
  password: "", // Leave blank unless you set one
  database: "hookup_db", // Your database name from phpMyAdmin
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

module.exports = db;
