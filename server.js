const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Serve Home page
app.use("/home", express.static(path.join(__dirname, "Home")));

// Serve labs
app.use("/LabTest", express.static(path.join(__dirname, "Labs", "Lab Test")));
app.use("/Lab0", express.static(path.join(__dirname, "Labs", "Lab 0")));
app.use("/Lab1", express.static(path.join(__dirname, "Labs", "Lab 1")));
app.use("/Lab2", express.static(path.join(__dirname, "Labs", "Lab 2")));

// Optional: redirect root to home
app.get("/", (req, res) => {
  res.redirect("/home");
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
