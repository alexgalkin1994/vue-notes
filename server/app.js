const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
require("dotenv/config");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8080"
  })
);

// Passport Middleware
app.use(passport.initialize());
// Strategy
require("./config/passport")(passport);

// Import Routes
const notesRoute = require("./routes/notes");
app.use("/notes", notesRoute);

const usersRoute = require("./routes/users");
app.use("/users", usersRoute);

const authRoute = require("./routes/auth");
app.use("/api/auth", authRoute);

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
