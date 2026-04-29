const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 👇 IMPORT ROUTES FIRST
const participantRoutes = require("./routes/participants");
const programRoutes = require("./routes/programs");

// 👇 THEN CREATE APP
const app = express();

app.use(cors());
app.use(express.json());

// 👇 THEN USE ROUTES
app.use("/api/participants", participantRoutes);
app.use("/api/programs", programRoutes);

// 👇 ADD THIS LINE (use routes)
app.use("/api/participants", participantRoutes);

// Database connection
mongoose.connect("mongodb+srv://PGCCteam2:PGCCteam2@pgccteam2.igmrkdq.mongodb.net/cetat?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("CETAT API running");
});

// SERVER
app.listen(5000, () => console.log("Server running on port 5000"));