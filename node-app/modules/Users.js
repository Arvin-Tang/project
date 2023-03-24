// 引入mongoose 便于存储
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// 创建Schema
const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    // 身份
    identity:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = User = mongoose.model("users",UserSchema) 