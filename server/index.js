const keys = require("./keys");

// Express App Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Express route handlers

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(5000, err => {
  console.log("Listening on port 5000");
});
