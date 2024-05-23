const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const StudentRoutes = require("./routes/students");
const cors =  require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Student Management System");
});

app.use("/api/students", StudentRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true 
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Could not connect to MongoDB", err);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
