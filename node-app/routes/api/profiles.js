// @login & register
const express = require("express");
const router = express.Router();
const passport = require("passport");
// 第三方头像库 用法： gravatar.url(email,options,protocol) 第一个参数是email 第二个是对象

const Profile = require("../../modules/Profile");

// @route GET api/users/test
// @desc 返回请求json数据
// @access public
router.get("/test", (req, res) => {
  res.json({ msg: "profiles " });
});

// @route GET api/profiles/add
// @desc 添加信息接口
// @access Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};

    if (req.body.type) {
      profileFields.type = req.body.type;
    }
    if (req.body.describe) {
      profileFields.describe = req.body.describe;
    }
    if (req.body.incode) {
      profileFields.incode = req.body.incode;
    }
    if (req.body.expend) {
      profileFields.expend = req.body.expend;
    }
    if (req.body.cash) {
      profileFields.cash = req.body.cash;
    }
    if (req.body.remark) {
      profileFields.cash = req.body.remark;
    }
    if (req.body.date) {
      profileFields.date = req.body.date;
    }

    new Profile(profileFields).save().then((profile) => {
      res.json(profile);
    });
  }
);

// @route GET api/profiles
// @desc 获取所有信息
// @access Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // 前端传来的id
    Profile.find()
      .then((profile) => {
        if (!profile) return res.status(404).json("没有任何内容");
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route GET api/profiles/:id
// @desc 获取个人信息
// @access Private

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // 前端传来的id
    Profile.findOne({ _id: req.params.id })
      .then((profile) => {
        if (!profile) return res.status(404).json("没有任何内容");
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);
// @route GET api/profiles/edit
// @desc 编辑信息
// @access Private

router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};

    if (req.body.type) {
      profileFields.type = req.body.type;
    }
    if (req.body.describe) {
      profileFields.describe = req.body.describe;
    }
    if (req.body.incode) {
      profileFields.incode = req.body.incode;
    }
    if (req.body.expend) {
      profileFields.expend = req.body.expend;
    }
    if (req.body.cash) {
      profileFields.cash = req.body.cash;
    }
    if (req.body.remark) {
      profileFields.cash = req.body.remark;
    }
    if (req.body.date) {
      profileFields.date = req.body.date;
    }

    Profile.findOneAndUpdate(
      { _id: req.params.id },
      { $set: profileFields },
      { new: true }
    )
      .then((profile) => res.json(profile))
      .catch((err) => res.json(err));
  }
);

// @route POST api/profiles/delete
// @desc 删除信息
// @access Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.params.id", req.params.id);
    Profile.findOneAndRemove({ _id: req.params.id })
      .then((profile) => {
        console.log("profile",profile);
        res.json(profile)
      })
      .catch((err) => res.status(404).json("删除失败"));
  }
);

module.exports = router;
