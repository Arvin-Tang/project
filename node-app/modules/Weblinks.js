// 引入mongoose 便于存储
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 创建Schema
const Weblink = new Schema({
  // 身份
  webUrl: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Weblinks = mongoose.model("weblinks", Weblink);
