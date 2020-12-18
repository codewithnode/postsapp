const mongoose = require("mongoose");

let _db;

const initdb = () => {
  if (_db) {
    return _db;
  } else {
    mongoose.connect("mongodb://localhost:27017/postsApp", {
      useNewUrlParser: true
    });

    _db = mongoose.connection;
    return _db;
  }
};

const getdb = () => {
  return _db;
};

module.exports = { initdb, getdb };
