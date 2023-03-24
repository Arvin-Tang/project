const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

// 引入 users.js
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles")
const weblinks = require("./routes/api/weblinks")

// DB config
const db = require("./config/keys").mongoURI;

// 使用中间件，对post参数解析,写在routes之前，否则获取不到body值
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to mongodb
mongoose
  .connect(db)
  .then(() => {
    console.log("mongoose connect success !");
  })
  .catch((err) => {
  });

app.get("/", (req, res) => {
  res.send("hello world!");
});

// 初始化 passport
app.use(passport.initialize());

require("./config/passport")(passport);

// 使用routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/weblinks",weblinks)

const port = process.env.PORT || 8088;

app.listen(port, () => {
  console.log("server running");
});
