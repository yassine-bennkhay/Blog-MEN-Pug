const pug = require("pug");
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
    res.render("index");
    // res.status(201).json({
    //   _id: post.id,
    //   titre: post.titre,
    //   auteur: post.auteur,
    //   resume: post.resume,
    //   content: post.content,
    // });
  }
}

async function editPost(req, res) {
  //Recupérer un post definie par son _id et renvoyer au client editPost.pug avec les donnée de ce post
  res.render("editPost");
}
/*
Route     PUT api/posts/edit/id
Access    Public
*/
async function updatePost(req, res) {
  //metre à jour un post et rediriger le client vers ce post
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400).json({
      message: "Post Not Found",
    });
  }
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedPost);
  res.end();
}

/*
Route     DELETE api/posts/delete/id
Access    Public
*/
async function deletePost(req, res) {
  //Suprimer un post et rediriger le client vers /
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400).json({
      message: "Cant Find Post",
    });
  }
  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({
    id: req.params.id,
  });
}

module.exports = {
  getPosts,
  getPost,
  addPost,
  updatePost,
  editPost,
  deletePost,
};
