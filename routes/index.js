const express = require("express");

const authRoute = require("./auth.route");
const documentRoute = require("./document.route");

const router = express.Router();

router.get("/", function (req, res, next) {
  res.sendStatus(200);
});

router.use("/auth", authRoute);
router.use("/documents", documentRoute);

module.exports = router;
