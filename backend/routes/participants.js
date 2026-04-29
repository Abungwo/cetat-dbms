// routes/participants.js
const express = require("express");
const router = express.Router();
const Participant = require("../models/Participant");

// GET all
router.get("/", async (req, res) => {
  const data = await Participant.find();
  res.json(data);
});

// POST
router.post("/", async (req, res) => {
  const newParticipant = new Participant(req.body);
  await newParticipant.save();
  res.json(newParticipant);
});

module.exports = router;

router.delete("/:id", async (req, res) => {
  try {
    await Participant.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Participant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/report", async (req, res) => {
  try {
    const { program, startDate, endDate } = req.query;

    let filter = {};

    if (program) {
      filter.program = program;
    }

    if (startDate && endDate) {
        filter.start_date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
    };
    }

    const data = await Participant.find(filter);
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});