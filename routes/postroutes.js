const express = require("express");
const postscontroller = require("../controllers/postController");
const authmiddleware = require("./authmiddleware");
const router = express.Router();

router.get("/", postscontroller.bloghome);

router.get(
  "/editpost/:id",
  authmiddleware.verifyloginstatus,
  postscontroller.editpost
);
router.get(
  "/createpost",
  authmiddleware.verifyloginstatus,
  postscontroller.createpost
);
router.post(
  "/createpost",
  authmiddleware.verifyloginstatus,
  postscontroller.createpostpost
);
router.post(
  "/updatepost",
  authmiddleware.verifyloginstatus,
  postscontroller.updatepost
);
router.get(
  "/deletepost/:id",
  authmiddleware.verifyloginstatus,
  postscontroller.deletepost
);

module.exports = router;
