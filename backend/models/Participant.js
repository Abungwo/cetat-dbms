// models/Participant.js
const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  program: String,
  start_date: Date,
  end_date: Date,
  status: String,
}, { timestamps: true }); // 👈 REQUIRED

module.exports = mongoose.model("Participant", participantSchema);