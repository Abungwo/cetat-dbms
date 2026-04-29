const express = require("express");
const router = express.Router();
const Program = require("../models/Program");

// GET all programs
router.get("/", async (req, res) => {
  const programs = await Program.find();
  res.json(programs);
});

// ADD program
router.post("/", async (req, res) => {
  const newProgram = new Program(req.body);
  await newProgram.save();
  res.json(newProgram);
});

// DELETE program
router.delete("/:id", async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;