const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    
  },
    isGoogleUser:{
        type:Boolean,
        default:false
    },
  resetToken: String,
  expireToken: Date,
});

module.exports = mongoose.model("User", userSchema);
