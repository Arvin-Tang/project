// 引入mongoose 便于存储
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 创建Schema
const ProfileSchema = new Schema({
  // 身份
  type: {
    type: String,
  },
  describe: {
    type: String,
  },
  incode: {
    type: String,
  },
  expend: {
    type: String,
  },
  cash: {
    type: String,
  },
  remark: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
