const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
