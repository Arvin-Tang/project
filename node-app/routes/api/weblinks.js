// @login & register
const express = require("express");
const router = express.Router();
const Weblinks = require("../../modules/Weblinks");

// @route GET api/users/test
// @desc 返回请求json数据
// @access public
router.get("/test", (req, res) => {
  res.json({ msg: 'link success'  });
});

// @route GET api/profiles/add
// @desc 添加信息接口
// @access Private

router.post(
  "/add",
  (req, res) => {
    const weblinks = {};
    console.log(req.body.webUrl);
    if (req.body.webUrl) {
      weblinks.webUrl = req.body.webUrl;
    }

    new Weblinks(weblinks).save().then((links) => {
      res.json(links);
    });
  }
);

// @route GET api/profiles
// @desc 获取所有信息
// @access Private

router.get(
  "/",
  (req, res) => {
    // 前端传来的id
    Weblinks.find()
      .then((links) => {
        if (!links) return res.status(404).json("没有任何内容");
        res.json(links);
      })
      .catch((err) => res.status(404).json(err));
  }
);


module.exports = router;
