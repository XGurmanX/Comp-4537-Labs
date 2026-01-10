// node server.js - to start the server
// http://localhost:8080 - to access the server

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use("/Lab0", express.static(path.join(process.cwd(), "Labs/Lab 0")));
app.use("/LabTest", express.static(path.join(process.cwd(), "Labs/LabTest")));
app.use("/", express.static(path.join(process.cwd(), "Labs/LabTest")));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
