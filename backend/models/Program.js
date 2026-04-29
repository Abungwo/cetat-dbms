const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  name: String,
  start_date: Date,
  end_date: Date,
  status: String,
}, { timestamps: true });

module.exports = mongoose.model("Program", programSchema);