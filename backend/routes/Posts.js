const express = require("express");
const router = express.Router();
const db = require("../models"); // Import the database instance

router.get("/", async (req, res) => {
  const listOfPosts = await db.Posts.findAll();
  res.json(listOfPosts);
});
router.get("/byid/:id", async (req, res) => {
  const id = req.params.id;
  const post = await db.Posts.findByPk(id);
  res.json(post);
});
router.post("/", async (req, res) => {
  try {
    const post = await db.Posts.create(req.body);
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

module.exports = router;
