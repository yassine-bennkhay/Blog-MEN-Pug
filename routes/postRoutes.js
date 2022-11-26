const express = require("express");
const {
  getPosts,
  getPost,
  addPost,
  updatePost,
  editPost,
  deletePost,
} = require("../controllers/postsController");

const router = express.Router();

// les routes post
router.get("/", getPosts);
router.get("/add-form", editPost);
router.get("/post/:id", getPost);
router.post("/add", addPost);
router.put("/add/:id", updatePost);
router.get("/delete/:id", deletePost);

module.exports = router;
