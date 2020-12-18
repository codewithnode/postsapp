const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
  email: "string",
  password: "string"
});

module.exports = mongoose.model("user", user);
