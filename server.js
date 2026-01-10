const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Expose the Labs folder
app.use("/Labs", express.static(path.join(__dirname, "Labs")));

// Default → LabTest
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Labs", "LabTest", "index.html"));
});

// /labtest → LabTest
app.get("/labtest", (req, res) => {
  res.sendFile(path.join(__dirname, "Labs", "LabTest", "index.html"));
});

// /lab0 → Lab 0
app.get("/lab0", (req, res) => {
  res.sendFile(path.join(__dirname, "Labs", "Lab 0", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
