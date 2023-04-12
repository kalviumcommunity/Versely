require("dotenv").config();

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const LogoImg =
  "http://res.cloudinary.com/dccplpniz/image/upload/v1678773937/y012gjuhmboj5y9mie0i.png";
const User = require("../models/userModel");
const requireAuth = require("../middleware/Auth");
const JWT_SECRET = process.env.SECRET;
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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

// Route for Signing up the user
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
                html: `<img src=${LogoImg} alt="logo">
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

// Route for Signing In the user
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

// Route for reseting the password
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
          html: `<img src=${LogoImg} alt="logo"/>
          <h2>Reset Your Versely Account Password</h2>
          <p>Hello ${user.email},</p><br/>
          <p>We are sending you this email because you requested a password reset. Click on the <a href="${process.env.REACT_CLIENT_API}/reset/${token}">link</a> to create a new password:</p>
          <p>If you didn't request a password reset, you can ignore this email. Your password will not be changed.</p>
          <p>Versely Team.</p>`,
        });
        return res.json({ message: "check your email for reset password" });
      });
    });
  });
});

// Route for setting up a new password
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

async function verifyToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const user = { email: payload.email, name: payload.name };
  return user;
}

// Route for  Signing in the user using Google
router.post("/auth/googleauth", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(402).json({ error: "Unexpected error occured" });
  }
  const user = await verifyToken(token);

  const userexist = await User.findOne({ email: user.email });

  if (userexist) {
    const { _id, name, email } = userexist;
    const jwtoken = jwt.sign({ _id: userexist._id }, JWT_SECRET);
    res.json({ jwtoken, user: { _id, name, email } });
  } else {
    const newuser = await new User({
      email: user.email,
      password: "",
      name: user.name,
      isGoogleUser: true,
    });
    await newuser.save();

    const googleuser = await User.findOne({ email: user.email });
    console.log(user);
    const { _id, name, email } = googleuser;
    const jwtoken = jwt.sign({ _id: googleuser._id }, JWT_SECRET);
    res.json({ jwtoken, user: { _id, name, email } });
  }
});
module.exports = router;

// Razorpay Payment Routes

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post("/razorpay", async (req, res) => {
  const integer = Number(req.body.amount1);
  console.log(integer);
  const payment_capture = 1;
  const amount = integer;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency: currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});
