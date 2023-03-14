const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const suggestSchema = new mongoose.Schema({
  option1: {
    type: Boolean,
    required: true,
  },
  option2: {
    type: Boolean,
    required: true,
  },
  option3: {
    type: Boolean,
    required: true,
  },
  option4: {
    type: Boolean,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  SongName: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Suggest", suggestSchema);
