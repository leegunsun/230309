const express = require("express");
const router = express.Router();
const Post = require("../schemas/posts.js");

router.get("/", async (req, res, next) => {
  const allPost = await Post.find({});
  res.json({ allPost: allPost });
});

router.post("/", async (req, res, next) => {
  const { title, content, postId } = req.body;

  const add = new Post({ title, content, postId });

  await add.save();

  res.send(`title : ${title}와 content : ${content}요청을 보냈습니다.`);
});

router.put("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  const findPost = await Post.findOne({ postId });

  findPost.content = content;
  findPost.title = title;
  findPost.postId = postId;

  await findPost.save();

  res.json({ findPost: findPost });
});

router.delete("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  const findPost = await Post.findOne({ postId });
  const allPost = await Post.find({});

  await findPost.deleteOne();

  res.json({ allPost: allPost });
});

module.exports = router;
