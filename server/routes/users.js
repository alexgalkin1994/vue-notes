const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/Users");
require("dotenv/config");

// Registration for new users
router.post("/register", (req, res) => {
  let { username, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.status(400).json({
      msg: "Password does not match."
    });
  }

  // Check if username unique
  User.findOne({ username: username }).then(user => {
    if (user) {
      return res.status(400).json({
        msg: "Username is already taken."
      });
    }
  });

  // Check if email unique
  User.findOne({ email: email }).then(user => {
    if (user) {
      return res.status(400).json({
        msg: "This e-mail is already registered."
      });
    }
  });

  // Register new user
  const newUser = new User({
    username,
    email,
    password
  });

  // Hash password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        throw err;
      } else {
        newUser.password = hash;
        newUser.save().then(user => {
          return res.status(201).json({
            success: true,
            msg: "Registered new user."
          });
        });
      }
    });
  });
});

// Login
router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }).then(user => {
    // If username not found
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "Username has not been found."
      });
    }

    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      // Correct password
      if (isMatch) {
        const payload = {
          _id: user._id,
          username: user.username,
          email: user.email
        };

        jwt.sign(
          payload,
          process.env.SECRET,
          { expiresIn: "7 days" },
          (err, token) => {
            res.status(200).json({
              success: true,
              user: user,
              token: `Bearer ${token}`,
              msg: "You are now logged in!"
            });
          }
        );
      } else {
        return res.status(404).json({
          success: false,
          msg: "Incorrect password"
        });
      }
    });
  });
});

// Profile
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      user: req.user
    });
  }
);

module.exports = router;
