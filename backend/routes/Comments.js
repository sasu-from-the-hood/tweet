const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await db.Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

router.post("/", async (req, res) => {
  const comments = await db.Comments.create(req.body);
  res.json(comments);
});

module.exports = router;
