const mongoose = require("mongoose");

const NotesSchema = mongoose.Schema({
  title: {
    type: String
  },
  text: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Notes", NotesSchema);
