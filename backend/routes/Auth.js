const express = require("express");
const db = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.Users.findOne({ where: { email: email } });
    if (!user) return res.json({ error: "User Doesn't Exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ error: "Cridential Error" });
    }
    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );

    return res.json(accessToken);
  } catch (error) {
    console.error(error);
  }
});
router.post("/", async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const signIn = await db.Users.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    res.json(signIn);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
