const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// Routers

const postRouter = require("./routes/Posts");
app.use("/post", postRouter);

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("The server is running on port 3000");
  });
});
