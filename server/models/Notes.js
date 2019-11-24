const mongoose = require("mongoose");

// Schema for MongoDB
const NotesSchema = mongoose.Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  text: {
    type: String
  },
  importance: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Notes", NotesSchema);
