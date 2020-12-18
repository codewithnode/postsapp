const Post = require("../models/post");

const fetch = (req, res, next) => {
  Post.find().then(postdata => {
    res.render("showallposts", { posts: postdata });
  });
};

const bloghome = (req, res, next) => {
  //console.log("What is the status of is logged in ", req.session.isLoggedin);
  const loginstatus = req.session.isLoggedin;
  const loggedout = !loginstatus;
  Post.find().then(data => {
    res.render("partials/header", {
      posts: data,
      loginstatus: loginstatus,
      loggedout: loggedout
    });
  });
};

const createpost = (req, res, next) => {
  res.render("createpost");
};

const editpost = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Post.findById(id)
    .then(data => {
      console.log("post found");
      console.log(data);
      res.render("editpost", { postdata: data });
    })
    .catch(err => {
      console.log(err);
    });
};

const createpostpost = (req, res, next) => {
  if (req.session.user) {
    const post = req.body.post;
    const author = req.session.user.email;
    Post.create({ post: post, author: author })
      .then(data => {
        //console.log("Inserted a document with id " + data);
        //req.session.postcreated = true;
        res.redirect("/");
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    console.log("Login to create a post!!");
    res.redirect("/");
  }
};

const updatepost = (req, res, next) => {
  const id = req.body.id;
  console.log("Update id " + id);
  Post.updateOne(
    { _id: id },
    { $set: { post: req.body.post, author: req.body.author } }
  )
    .then(postdata => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
};

const deletepost = (req, res, next) => {
  const id = req.params.id;
  Post.deleteOne({ _id: id })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  fetch,
  bloghome,
  editpost,
  updatepost,
  deletepost,
  createpost,
  createpostpost
};
