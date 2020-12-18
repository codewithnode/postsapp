const express = require("express");

const router = express.Router();

const authcontroller = require("../controllers/authController");

router.get("/login", authcontroller.getlogin);
router.get("/logout", authcontroller.logout);
router.post("/login", authcontroller.postlogin);
router.get("/signup", authcontroller.getsignup);
router.post("/signup", authcontroller.postsignup);

module.exports = router;
