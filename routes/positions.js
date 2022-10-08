var express = require("express");
var router = express.Router();
const Position = require("../models/Position");
const helpers = require("../helpers/util");

router.get(
  "/positions.json/",
  helpers.verifyToken,
  async function (req, res, next) {
    const { full_time, description, location, page } = req.query;

    var finalQuery = {};
    if (location || description || full_time) {
      finalQuery = {
        $and: [
          location
            ? {
                location: { $regex: location, $options: "i" },
              }
            : {},
          description
            ? { description: { $regex: description, $options: "i" } }
            : {},
          full_time
            ? full_time == "true"
              ? {
                  type: "Full Time",
                }
              : {}
            : {},
        ],
      };
    }
    try {
      const data = await Position.find(finalQuery, null, {
        skip: parseInt((page - 1) * 3),
        limit: 3,
      }).exec();

      res.status(200).json(data);
    } catch (err) {
      res.status(201).json({
        success: false,
        message: "something wrong",
        err,
      });
    }
  }
);

router.get("/positions/:id", helpers.verifyToken, async function (req, res) {
  try {
    const data = await Position.find({ id: req.params.id });
    res.status(201).json({
      success: true,
      message: "data found",
      data,
    });
  } catch (err) {
    res.status(201).json({
      success: false,
      message: "something wrong",
      err,
    });
  }
});

module.exports = router;
