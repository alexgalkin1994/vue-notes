const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import Routes
const notesRoute = require("./routes/notes");
app.use("/notes", notesRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Thats Home");
});

app.get("/notes", (req, res) => {
  res.send("Thats Notes");
});

// Connect to DB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true
  })
  .then(() => console.log("DB Connected!"))
  .catch(err => {
    console.log("Connection Error: ", err.message);
  });

app.listen(3000);
