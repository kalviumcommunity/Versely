require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const lyricRoutes = require("./routes/lyrics.js");
const userRoutes = require("./routes/user.js");
const cors = require("cors");

mongoose.set("strictQuery", false);
//express app
const app = express();

// middleware
app.use(express.json());
app.use(cors("https://versely-go.onrender.com/getposts"));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api", lyricRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");

    //listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
