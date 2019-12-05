const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const verify = require("./verifyToken");

// Get all notes
// router.get("/", async (req, res) => {
//   try {
//     const notes = await Note.find();
//     res.json(notes);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// Get all notes from specific user
router.get("/", verify, async (req, res) => {
  console.log(req.user._id);
  try {
    const notes = await Note.find({ author: req.user._id });
    console.log(notes);
    res.json(notes).send("");
  } catch (err) {}
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
router.put("/:noteId", async (req, res) => {
  try {
    console.log("req");
    console.log(req);
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.noteId },
      {
        $set: {
          title: req.body.title,
          text: req.body.text,
          importance: req.body.importance,
          edited: true
        }
      },
      { new: true }
    );
    console.log("weqni uweqeiuqneiuqneuiwnqeiuqwueqi");
    console.log(updatedNote);
    res.json(updatedNote);
  } catch (err) {
    res.json({ message: err });
  }
});

// Post a note
router.post("/", verify, async (req, res) => {
  console.log(req.body.title);
  const note = new Note({
    title: req.body.title,
    author: req.user._id,
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
