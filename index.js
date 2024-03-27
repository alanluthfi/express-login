// index.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  // Simple validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both username and password" });
  }
  // Mock database of users
  const users = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
  ];
  // Check if user exists
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  return res.json({ message: "Login successful" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
