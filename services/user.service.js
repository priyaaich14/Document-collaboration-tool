import createError from "http-errors";
import { User } from "../models";
import ERROR from "../constants/error"; // Ensure ERROR is imported from your constants file

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email }).lean(); // Use const for variable declaration
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

export default {
  getUserByEmail,
  createUser,
};
