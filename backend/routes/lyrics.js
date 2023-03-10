const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Lyric = require("../models/lyricmodel");
const requireAuth = require("../middleware/Auth");

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
  const { SongName, Artist, lyrics, aboutLyrics, image } = req.body;
  if (!SongName || !Artist || !lyrics) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  req.user.password = undefined;
  const post = new Lyric({
    SongName,
    Artist,
    lyrics,
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
      res.json({ lyric });
      console.log(req.user._id);
    })
    .catch((err) => {
      return res.status(404).json({ error: "lyrics not found" });
    });
});

// router.delete("/deletelyric/:id", requireAuth, (req, res) => {
//   Lyric.findOne({ _id: req.params.id })
//     .populate("postedBy", "_id name")
//     .exec((err, post) => {
//       if (err || !post) {
//         return res.status(422).json({ error: err });
//       }
//       if (req.user._id.toString() === "63f9e3f0d09623d4d68534d6") {
//         post.remove().then((result) => {
//           // console.log(err);
//         });
//       }
//     });
// });

module.exports = router;
