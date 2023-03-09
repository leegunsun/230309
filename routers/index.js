const express = require("express");
const router = express.Router();
const Post = require("../schemas/posts.js");

//모든 포스트를 검색합니다
router.get("/", async (req, res, next) => {
  const allPost = await Post.find({});
  res.json({ allPost: allPost });
});

// 포스트를 작성합니다 title, content, postId가 있으며 postId는
// 나중에 작성을 수정하거나 삭제 할때 쓰입니다.
router.post("/", async (req, res, next) => {
  const { title, content, postId } = req.body;

  const add = new Post({ title, content, postId });

  await add.save();

  res.send(`title : ${title}와 content : ${content}요청을 보냈습니다.`);
});

// 포스트를 수정합니다. postId를 params로 받아서 특정 Post를 찾고
// 그 내용을 수정합니다.
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

// 포스트를 수정합니다. postId를 params로 받아서 특정 Post를 찾고
// 그 내용을 삭제합니다
router.delete("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  const findPost = await Post.findOne({ postId });
  const allPost = await Post.find({});

  await findPost.deleteOne();

  res.json({ allPost: allPost });
});

module.exports = router;
