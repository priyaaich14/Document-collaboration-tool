const createError = require("http-errors");
const { User } = require("../models");

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email }).lean();

  return user;
};

const createUser = ({ uniqueId, email, displayName = "", photoURL = "" }) => {
  if (!uniqueId) {
    throw createError(400, ERROR.REQUIRED_ID);
  }

  if (!email) {
    throw createError(400, ERROR.REQUIRED_EMAIL);
  }

  return User.create({ _id: uniqueId, email, displayName, photoURL });
};

module.exports = {
  getUserByEmail,
  createUser,
};
