import express = from "express");

import authRoute = from "./auth.route");
import documentRoute = from "./document.route");

import router = express.Router();

router.get("/", function (req, res, next) {
  res.sendStatus(200);
});

router.use("/auth", authRoute);
router.use("/documents", documentRoute);

export default router;
