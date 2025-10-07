const express = require("express");
const app = express();

// First middleware
app.use((req, res, next) => {
  console.log("Middleware 1: This always runs");
  next();
});

// Second middleware
app.use((req, res, next) => {
  console.log("Middleware 2: This also always runs");
  next();
});

// Route handler
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Try making a request to http://localhost:8080/");
});
