const verifyloginstatus = (req, res, next) => {
  if (!req.session.user) {
    console.log("user doesnt exists");
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = { verifyloginstatus };
