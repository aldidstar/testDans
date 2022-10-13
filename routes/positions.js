var express = require("express");
const axios = require("axios");
var router = express.Router();
const helpers = require("../helpers/util");

router.get("/positions.json", helpers.verifyToken, async function (req, res) {
  const params = {
    params: {
      page: req.query.page,
    },
  };
  try {
    const data = await axios.get(
      `http://dev3.dansmultipro.co.id/api/recruitment/positions.json`,
      params
    );

    let result2 = [];

    if (
      req.query.location &&
      req.query.description &&
      req.query.full_time == "true"
    ) {
      let result = data.data;
      let regexp = new RegExp(req.query.description, "gi");
      let result1 = await result.filter((data) => {
        return (
          data.location == req.query.location &&
          data.description.match(regexp) &&
          data.type == "Full Time"
        );
      });
      result2.push(result1);
    } else if (req.query.location && req.query.description) {
      let result = data.data;
      let regexp = new RegExp(req.query.description, "gi");
      let result1 = await result.filter((data) => {
        return (
          data.location == req.query.location && data.description.match(regexp)
        );
      });
      result2.push(result1);
    } else if (req.query.location && req.query.full_time == "true") {
      let result = data.data;
      let result1 = await result.filter((data) => {
        return data.location == req.query.location && data.type == "Full Time";
      });
      result2.push(result1);
    } else if (req.query.full_time == "true" && req.query.description) {
      let result = data.data;
      let regexp = new RegExp(req.query.description, "gi");
      let result1 = await result.filter((data) => {
        return data.type == "Full Time" && data.description.match(regexp);
      });
      result2.push(result1);
    } else if (req.query.description) {
      let result = data.data;
      let regexp = new RegExp(req.query.description, "gi");
      let result1 = await result.filter((data) => {
        return data.description.match(regexp);
      });
      result2.push(result1);
    } else if (req.query.location) {
      let result = data.data;
      let result1 = await result.filter((data) => {
        return data.location == req.query.location;
      });
      result2.push(result1);
    } else if (req.query.full_time == "true") {
      let result = data.data;
      let result1 = await result.filter((data) => {
        return data.type == "Full Time";
      });
      result2.push(result1);
    } else {
      let result = data.data;
      result2.push(result);
    }

    res.status(201).json({
      success: true,
      message: "data found",
      result2,
    });
  } catch (err) {
    res.status(201).json({
      success: false,
      message: "something wrong",
      err,
    });
  }
});

router.get("/positions/:id", helpers.verifyToken, async function (req, res) {
  try {
    const data = await axios.get(
      `http://dev3.dansmultipro.co.id/api/recruitment/positions/${req.params.id}`
    );
    const tes = data.data;
    console.log(tes);
    res.status(201).json({
      success: true,
      message: "data found",
      tes,
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
