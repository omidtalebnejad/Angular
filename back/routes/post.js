const postRoute = require("express").Router();
// const { createPost, posts, postId, search } = require("../controller/post");
const jwt = require("jsonwebtoken");
const Post = require("../model/post.js");
const User = require("../model/user");
// create post -  HTTP POST METHOD
postRoute.post("/post/create", async (req, res) => {
  const { title, content, description, pic } = req.body;
  try {
    const { token } = req.cookies;
    const user = await jwt.verify(token, process.env.JWT_SECRET, {});
    if (token) {
      const post = await Post.create({
        title,
        author: user.id,
        content,
        description,
        pic,
      });
      return res
        .status(200)
        .json({ message: "successfully post created", data: post });
    }
  } catch (err) {
    console.log("user register is  err", err);
    return res
      .status(500)
      .json({ message: "server is proplem cant create post", err: err });
  }
});
// take all post -  HTTP GET METHOD
postRoute.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username , pic")
      .sort({ createAt: -1 });
    console.log(posts, "all post");
    return res.status(200).json(posts);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "take all post is proplem in server", err: err });
  }
});
// take single post with Id -  HTTP GET METHOD
postRoute.get("/single/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    return res.status(200).json(post);
  } catch (err) {
    console.log(err, "cant get single post with id");
    return res.status(400).json("cant get single post wit id", err);
  }
});
// serach post -  HTTP GET METHOD
postRoute.get("/search/post", async (req, res) => {
  const query = req.query.data;
  console.log("query", query);
  try {
    const user = await User.findOne({
      username: { $regex: query, $options: "i" },
    });
    const search = await Post.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: user ? user._id : null },
      ],
    }).populate("author", "username");

    console.log(search);
    return res.status(200).json(search);
  } catch (err) {
    console.log("server is error search post cn", err);
    return res.status(400).json("server is error search controller");
  }
});

module.exports = postRoute;
