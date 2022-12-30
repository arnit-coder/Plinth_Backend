//create models here
const mongoose = require('mongoose')
// const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: [true, "email required"],
    unique: [true, "email already registered"],
  },
  firstName: {type: String, required : true},
  lastName: {type: String, required : true},
  profilePhoto: {type: String, required : true},

});

var userModel = mongoose.model("user", userSchema, "user");

module.exports = userModel;