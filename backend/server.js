require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const lyricRoutes = require("./routes/lyrics.js");
const userRoutes = require("./routes/user.js");
const cors = require("cors");

app.use(cors());

mongoose.set("strictQuery", false);
//express app
const app = express();

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
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
    app.listen(port, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
