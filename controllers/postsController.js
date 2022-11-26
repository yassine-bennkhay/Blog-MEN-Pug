const pug = require("pug");
const { findById } = require("../models/postModel");
const Post = require("../models/postModel");

/*
Route     POST api/posts/
Access    Public
*/
async function getPosts(req, res) {
  //Recupérer tous les posts dans myBlogdb et envoyer index.pug au client
  const posts = await Post.find();
  res.render("index", {
    posts: posts,
  });

  // res.status(200).json(posts);
}
/*
Route     POST api/posts/get/id
Access    Public
*/
async function getPost(req, res) {
  //Recupérer un post definie par son _id dans myBlogdb et envoyer post.pug au client
  const post = await Post.findById(req.params.id);
  // if (!post) {
  //   res.render({post:"Post no"})
  // }
  res.render("post", {
    post: post,
  });
}

/*
Route     POST api/posts/add
Access    Public
*/
async function addPost(req, res) {
  //Créer un nouveau post dans myBlogdb et rediriger le client vers /

  const { titre, auteur, resume, content } = req.body;
  if (!titre || !auteur || !resume || !content) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  const post = await Post.create({
    titre,
    auteur,
    resume,
    content,
  });
  if (post) {
    res.redirect(`/posts/post/${post.id}`);
  }
}
async function displayPostForm(req, res) {
  const postToBeUpdated = false;
  res.render("editPost", {
    postToBeUpdated: postToBeUpdated,
  });
}
async function editPost(req, res) {
  //Recupérer un post definie par son _id et renvoyer au client editPost.pug avec les donnée de ce post
  let postToBeUpdated = await Post.findById(req.params.id);
  res.render("editPost", {
    postToBeUpdated: postToBeUpdated,
  });
}
/*
Route     PUT api/posts/edit/id
Access    Public
*/
async function updatePost(req, res) {
  //metre à jour un post et rediriger le client vers ce post
  const { titre, auteur, resume, content } = req.body;

  let iduser = req.body.id;
  await Post.updateOne({ _id: iduser }, { titre, auteur, resume, content });

  res.redirect("/posts/post/" + iduser);
}

/*
Route     DELETE api/posts/delete/id
Access    Public
*/
async function deletePost(req, res) {
  //Suprimer un post et rediriger le client vers /
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/posts");
}

module.exports = {
  getPosts,
  getPost,
  addPost,
  updatePost,
  editPost,
  deletePost,
  displayPostForm,
};
