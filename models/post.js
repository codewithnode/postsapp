const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  post: "string",
  author: "string"
});

module.exports = mongoose.model("Post", schema);
