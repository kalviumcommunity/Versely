const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const id = mongoose.Schema.Types.ObjectId;

const lyricSchema = new mongoose.Schema({
  SongName: {
    type: String,
    required: true,
  },
  Artist: {
    type: String,
    required: true,
  },
  lyrics: {
    type: String,
    required: true,
  },
  language: {
    type: String,
  },
  LangLyrics: {
    type: String,
    default: "Not Available",
  },
  aboutLyrics: {
    type: String,
    default: "no",
  },
  image: {
    type: String,
    default: "https://discussions.apple.com/content/attachment/592590040",
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Lyric", lyricSchema);
