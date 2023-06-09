// @login & register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// 第三方头像库 用法： gravatar.url(email,options,protocol) 第一个参数是email 第二个是对象
const gravatar = require("gravatar");

const User = require("../../modules/Users");

// @route GET api/users/test
// @desc 返回请求json数据
// @access public
// router.get("/test", (req, res) => {
//   res.json({ msg: "login " });
// });

router.post("/register", (req, res) => {
  User.findOne({ phoneNumber: req.body.phoneNumber }).then((user) => {
    if (user) {
      return res.status(400).json({ phoneNumber: "手机号已被注册" });
    } else {
      //
      const avatar = gravatar.url(req.body.phoneNumber, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      const newUser = new User({
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        avatar,
        identity: req.body.identity,
      });

      // 密码加密 使用bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash; //加密后的密码

          newUser
            .save()
            .then((user) => res.json(user)) //返回给请求用户
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc 返回token jwt
// @access public
router.post("/login", (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  // 查询数据库  查询有没有email的用户 email:email
  User.findOne({ phoneNumber }).then((user) => {
    if (!user) {
      return res.status(404).json({ phoneNumber: "用户不存在" });
    }

    // 密码匹配 把前端传来的数据和数据库的user的password匹配
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const rule = {
          id: user.id,
          name: user.username,
          identity: user.identity,
        };
        // 返回token
        // jwt.sign("规则","加密的名字","过期时间","箭头函数的回调")
        jwt.sign(
          rule,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              // Bearer后面一定要加空格
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({ password: "密码错误" });
      }
    });
  });
});

// @route GET api/users/current
// @desc  return current user
// @access Private 私密
// router.get("/currnt",'验证token',"回调")
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.username,
      phoneNumber: req.user.phoneNumber,
      identity: req.user.identity,
    });
  }
);

module.exports = router;
