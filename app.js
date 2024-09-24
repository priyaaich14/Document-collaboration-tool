// require("dotenv").config();

// const createError = require("http-errors");
// const express = require("express");
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const logger = require("morgan");
// const passport = require("passport");
// const cors = require("cors");

// const routes = require("./routes/index");

// const { dbInit } = require("./database");
// const { socketInit } = require("./connection/socket");

// const app = express();

// const corsOption = {
//   origin: process.env.CORS_ALLOWED_ORIGIN,
//   optionsSuccessStatus: 200,
//   credentials: true,
// };

// app.use(logger("dev"));
// app.use(express.json());
// app.use(cors(corsOption));
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.use(passport.initialize());
// app.use(passport.session());

// dbInit();

// socketInit();

// app.use(routes);

// app.use(function (req, res, next) {
//   next(createError(404));
// });

// app.use(function (err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   res.status(err.status || 500).json(err);
// });

// module.exports = app;


import "dotenv/config";
import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import passport from "passport";
import cors from "cors";

import routes from "./routes/index.js";
import { dbInit } from "./database/index.js";
import { socketInit } from "./connection/socket.js";

const app = express();

const corsOption = {
  origin: process.env.CORS_ALLOWED_ORIGIN,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(logger("dev"));
app.use(express.json());
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), "public")));

app.use(passport.initialize());
app.use(passport.session());

dbInit();

socketInit();

app.use(routes);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json(err);
});

export default app;
