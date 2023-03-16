const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Lyric = require("../models/lyricmodel");
const requireAuth = require("../middleware/Auth");
const Suggest = require("../models/suggestModel");

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

router.get("/alllyric", requireAuth, (req, res) => {
  Lyric.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createlyric", requireAuth, (req, res) => {
  const { SongName, Artist, lyrics, language, LangLyrics, aboutLyrics, image } =
    req.body;
  if (!SongName || !Artist || !lyrics) {
    return res.status(422).json({ error: "please add required fields" });
  }
  req.user.password = undefined;
  const post = new Lyric({
    SongName,
    Artist,
    lyrics,
    language,
    LangLyrics,
    aboutLyrics,
    image,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      return res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/mylyric", requireAuth, (req, res) => {
  Lyric.find({ postedBy: req.user.id })
    .populate("postedBy", "_id name")
    .then((mylyric) => {
      res.json({ mylyric });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/lyric/:id", (req, res) => {
  Lyric.findOne({ _id: req.params.id })
    .populate("postedBy", "_id name")
    .then((lyric) => {
      return res.json({ lyric });
      console.log(req.user._id);
    })
    .catch((err) => {
      return res.status(404).json({ error: "lyrics not found" });
    });
});

router.post("/suggest", requireAuth, (req, res) => {
  const { option1, option2, option3, option4, content, SongName } = req.body;
  if (!content) {
    return res.status(422).json({ error: "please add required fields" });
  }
  req.user.password = undefined;
  const suggest = new Suggest({
    option1,
    option2,
    option3,
    option4,
    content,
    SongName,
    postedBy: req.user,
  });
  suggest
    .save()
    .then((result) => {
      transporter.sendMail({
        to: "praduman03k@gmail.com",
        from: "pradumandumy12399@gmail.com",
        subject: "Song improve Suggestion",
        html: `<img src="http://res.cloudinary.com/dccplpniz/image/upload/v1678773937/y012gjuhmboj5y9mie0i.png" alt="logo"/>
          <h2>Someone Suggested a Improvement in a Song Lyric</h2>
          <p>Song Name:${suggest.SongName}</p>
          <p>improve about song: ${suggest.option1}</p>
          <p>improve about song: ${suggest.option2}</p>
          <p>add something else: ${suggest.option3}</p>
          <p>other: ${suggest.option4}</p>
          <p>Suggest an Improvement:<br/> ${suggest.content}</p>
          <p>Submitted by: ${suggest.postedBy.name},${suggest.postedBy.email}</p>`,
      });
      return res.json({ suggest: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
