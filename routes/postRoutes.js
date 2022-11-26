const express = require("express");
const {
  getPosts,
  getPost,
  addPost,
  updatePost,
  editPost,
  deletePost,
  displayPostForm
} = require("../controllers/postsController");

const router = express.Router();

// les routes post
router.get("/", getPosts);
router.get("/add-form",displayPostForm)
router.get("/edit-form/:id", editPost);
router.get("/post/:id", getPost);
router.post("/add", addPost);
router.post("/update", updatePost);
router.get("/delete/:id", deletePost);

module.exports = router;
