require("dotenv").config();

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
// const User = mongoose.model("User");
const requireAuth = require("../middleware/Auth");
const JWT_SECRET = process.env.SECRET;
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.API_KEY_EMAIL,
    },
  })
);

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "user already exist with this email" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          name,
        });

        user
          .save()
          .then((user) => {
            transporter.sendMail({
              to: user.email,
              from: "praduman03k@gmail.com",
              subject: "Thankypu for signing up to Versely",
              html: "<h1>Welcome to Versely</h1>",
            });
            res.json({ message: "Saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please provide email and password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt.compare(password, savedUser.password, (err, result) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Authentication failed", error: err });
      }
      if (result) {
        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
        const { _id, name, email } = savedUser;
        res.json({ token, user: { _id, name, email } });
      }
    });
  });
});

router.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "User don't exist with that email" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: "praduman03k@gmail.com",
          subject: "password reset",
          html: `<p>You requested for password reset
          <h5>click on this <a href="http://localhost:3000/reset/${token}>link</a> to rest password</h5>`,
        });
        res.json({ message: "check your email for reset password" });
      });
    });
  });
});

module.exports = router;
