const router = require("express").Router();
const User = require("../models/Users");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
router.post("/register", async (req, res) => {
  // Check if valid data
  const validation = registerValidation(req.body);
  const { error } = validation;

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if user already exists
  const usernameExists = await User.findOne({ username: req.body.username });
  const emailExists = await User.findOne({ email: req.body.email });
  if (usernameExists) return res.status(400).send("Username already exists");
  if (emailExists) return res.status(400).send("Email already exists");

  // Hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.send({ userid: user._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  // Validate User
  const validation = loginValidation(req.body);
  const { error } = validation;

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Check if user exists
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Username does not exist.");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password.");

  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  res.header("token", token).send(token);
});

module.exports = router;
