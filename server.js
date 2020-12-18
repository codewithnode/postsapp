const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const path = require("path");
const db = require("./db/db");

const authrouter = require("./routes/authroutes");
const postrouter = require("./routes/postroutes");

const app = express();
var store = new MongoDBStore({
  uri: "mongodb://localhost:27017/postsApp",
  collection: "mySessions"
});

// Catch errors
store.on("error", function(error) {
  console.log(error);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "assets")));

app.use(
  session({
    secret: "Super secret password",
    resave: false,
    saveUninitialized: true,
    store: store
  })
);

app.use(flash());

app.use(authrouter);
app.use(postrouter);
app.set("view engine", "ejs");

db.initdb().then(dbcon => {
  console.log("Connected !!");
  app.listen(3001);
});
