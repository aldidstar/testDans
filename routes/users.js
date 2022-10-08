var express = require("express");
var router = express.Router();
const User = require("../models/User");
const secretKey = "aldi";
var jwt = require("jsonwebtoken");
const helpers = require("../helpers/util");

/* GET users listing. */
router.get("/", function (req, res, next) {
  User.find({})
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

router.post("/register", async function (req, res, next) {
  try {
    const user = await User.create(req.body);
    if (!user)
      return res.json({
        success: false,
        message: "Authentication failed. User not found.",
      });

    user.validatePassword(req.body.password, async function (err, match) {
      try {
        if (err || !match)
          return res.json({
            success: false,
            message: "Authentication failed. Wrong password.",
          });

        var token = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          secretKey,
          { expiresIn: 60 * 60 }
        );

        // return the information including token as JSON
        const inputToken = await User.findByIdAndUpdate(user._id, {
          token: token,
        });

        res.status(201).json({
         data: {

           email: user.email
         },
          
          token: token,
        });
      } catch (err) {
        res.status(500).json({ err });
      }
    });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post("/login", async function (req, res) {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user)
      return res.json({
        success: false,
        message: "Authentication failed. User not found.",
      });

    user.validatePassword(req.body.password, async function (err, match) {
      try {
        if (err || !match)
          return res.json({
            success: false,
            message: "Authentication failed. Wrong password.",
          });

        var token = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          secretKey,
          { expiresIn: 60 * 60 }
        );

        // return the information including token as JSON
        const inputToken = await User.findByIdAndUpdate(user._id, {
          token: token,
        });

        res.status(201).json({
          data: {

            email: user.email
          },
          token: token
        });
      } catch (err) {
        res.status(500).json({ err });
      }
    });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.delete("/:id", function (req, res) {
  User.findByIdAndRemove(req.params.id).then(function (user) {
    res.json(user);
  });
});

router.post("/check", helpers.verifyToken, function (req, res, next) {
  User.findOne({
    token: req.body.token,
  })
    .then((user) => {
      res.status(200).json({
        valid: true,
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

router.get("/destroy/:id", function (req, res, next) {
  User.findByIdAndUpdate(req.params.id, {
    token: null,
  })
    .then((user) => {
      res.status(201).json({
        
        logout: true,
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

module.exports = router;
