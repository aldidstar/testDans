var mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Position = require("../models/Position");
require("dotenv").config();

mongoose.connect(process.env.DB_MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Now, the interesting part:

const position = path.join(__dirname, `positions.json`);
const file = fs.readFileSync(position, "utf8");
const data = JSON.parse(file);

Position.insertMany(data, function (err, r) {
  console.log(err, r);
});
