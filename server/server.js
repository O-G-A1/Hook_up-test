// const express = require("express");
// const cors = require("cors");
// const db = require("./db");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const JWT_SECRET = "your_secret_key";

// app.get("/", (req, res) => {
//   res.send("API is working ✅");
// });

// // ===== Register Route =====
// app.post("/register", async (req, res) => {
//   const { name, email, password, age, location } = req.body;

//   console.log("👉 Received registration data:", req.body); // Log input

//   if (!name || !email || !password || !age || !location) {
//     console.log("❌ Missing field(s)");
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("🔐 Hashed password:", hashedPassword);

//     db.query(
//       "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
//       [username, email, hashedPassword],
//       (err, result) => {
//         if (err) {
//           console.error("💥 DB error:", err);
//           if (err.code === "ER_DUP_ENTRY") {
//             return res
//               .status(409)
//               .json({ message: "Email already registered" });
//           }
//           return res
//             .status(500)
//             .json({ message: "Database error", error: err });
//         }

//         console.log("✅ User inserted:", result);
//         res.status(201).json({ message: "User registered successfully" });
//       }
//     );
//   } catch (error) {
//     console.error("💢 Hashing error:", error);
//     res.status(500).json({ message: "Error hashing password", error });
//   }
// });

// // ===== Login Route =====
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   db.query(
//     "SELECT * FROM users WHERE email = ?",
//     [email],
//     async (err, results) => {
//       if (err) {
//         return res.status(500).json({ message: "Database error", error: err });
//       }

//       if (results.length === 0) {
//         return res.status(401).json({ message: "Invalid email or password" });
//       }

//       const user = results[0];

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(401).json({ message: "Invalid email or password" });
//       }

//       const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
//         expiresIn: "1h",
//       });

//       res.json({ message: "Login successful", token });
//     }
//   );
// });

// app.listen(5000, () => {
//   console.log("🚀 Server running on http://localhost:5000");
// });

const express = require("express");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "your_secret_key";

app.get("/", (req, res) => {
  res.send("API is working ✅");
});

// ===== Register Route =====
app.post("/register", async (req, res) => {
  const { name, email, password, age, gender, location } = req.body;

  console.log("👉 Received registration data:", req.body);

  if (!name || !email || !password || !age || !gender || !location) {
    console.log("❌ Missing field(s)");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Hashed password:", hashedPassword);

    db.query(
      "INSERT INTO users (name, email, password, age, gender, location) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, hashedPassword, age, gender, location],
      (err, result) => {
        if (err) {
          console.error("💥 DB error:", err);
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(409)
              .json({ message: "Email already registered" });
          }
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }

        console.log("✅ User inserted:", result);
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    console.error("💢 Hashing error:", error);
    res.status(500).json({ message: "Error hashing password", error });
  }
});

// ===== Login Route =====
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ message: "Login successful", token });
    }
  );
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
