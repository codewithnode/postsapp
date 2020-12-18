const bcrypt = require("bcryptjs");
const User = require("../models/user");

const getlogin = (req, res, next) => {
  res.render("auth/login");
};

const getsignup = (req, res, next) => {
  res.render("auth/sign_up", {
    message: req.flash("error")
  });
};

const postsignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      console.log(user);
      if (user) {
        req.flash("error", "Email Already Exists");
        res.redirect("/signup");
      } else {
        bcrypt.hash(password, 12).then(hashedpw => {
          User.create({
            email: email,
            password: hashedpw
          }).then(user => {
            console.log("USer Created !!");
            res.redirect("/login");
          });
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const postlogin = (req, res, next) => {
  const email = req.body.email;
  const passwd = req.body.password;

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        console.log("Authentication Failed");
        return res.redirect("/login");
      } else {
        bcrypt.compare(passwd, user.password).then(result => {
          if (result) {
            req.session.isLoggedin = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect("/");
            });
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const logout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
};

module.exports = { getlogin, postlogin, logout, getsignup, postsignup };
