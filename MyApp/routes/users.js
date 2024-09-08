var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const User3Schema = mongoose.Schema({
  username : String,
  name : String,
  age : Number
});

User3Schema.plugin(plm);

module.exports = mongoose.model("users3", User3Schema);
module.exports = router;
