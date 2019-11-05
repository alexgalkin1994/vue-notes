const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");

// Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get a specific note
router.get("/:noteId", async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    res.json(note);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete a specific note
router.delete("/:noteId", async (req, res) => {
  try {
    const removedNote = await Note.remove({ _id: req.params.noteId });
    res.json(removedNote);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update a specific note
router.patch("/:noteId", async (req, res) => {
  try {
    const updatedNote = await Note.updateOne(
      { _id: req.params.noteId },
      {
        $set: {
          title: req.body.title,
          text: req.body.text,
          importance: req.body.importance
        }
      }
    );
    res.json(updatedNote);
  } catch (err) {
    res.json({ message: err });
  }
});

// Post a note
router.post("/", async (req, res) => {
  const note = new Note({
    title: req.body.title,
    text: req.body.text,
    importance: req.body.importance
  });

  try {
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
