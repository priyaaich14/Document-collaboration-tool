const passport = require("passport");
const createError = require("http-errors");
const ERROR = require("../constants/error");

const { verifyToken } = require("../lib/token");

const validateToken = async (req, res, next) => {
  const token = req.headers[process.env.JWT_SECRET_HEADER];

  if (!token) {
    throw createError(401, ERROR.UNAUTHORIZED);
  }

  const user = await verifyToken(token);

  req.user = user;

  return next();
};

module.exports = {
  validateToken,
};
