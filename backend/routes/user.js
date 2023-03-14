require("dotenv").config();

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const requireAuth = require("../middleware/Auth");
const JWT_SECRET = process.env.SECRET;
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "pradumandumy12399@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

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
            transporter.sendMail(
              {
                to: user.email,
                from: "pradumandumy12399@gmail.com",
                subject: "Thankyou for signing up to Versely",
                html: `<img src="http://res.cloudinary.com/dccplpniz/image/upload/v1678773937/y012gjuhmboj5y9mie0i.png" alt="logo">
                <h1>Welcome to Versely</h1>`,
              },
              function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent:" + info.response);
                }
              }
            );
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
          from: "pradumandumy12399@gmail.com",
          subject: "password reset",
          html: `<img src="http://res.cloudinary.com/dccplpniz/image/upload/v1678773937/y012gjuhmboj5y9mie0i.png" alt="logo"/>
          <h2>Reset Your Versely Account Password</h2>
          <p>Hello ${user.email},</p><br/>
          <p>We are sending you this email because you requested a password reset. Click on the <a href="http://localhost:3000/reset/${token}">link</a> to create a new password:</p>
          <p>If you didn't request a password reset, you can ignore this email. Your password will not be changed.</p>
          <p>Versely Team.</p>`,
        });
        return res.json({ message: "check your email for reset password" });
      });
    });
  });
});

router.post("/new-password", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "Try again later, Session expired" });
      }
      bcrypt.hash(newPassword, 12).then((hashedpassword) => {
        user.password = hashedpassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((saveduser) => {
          res.json({ message: "password updated successfully" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
