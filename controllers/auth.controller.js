const createError = require("http-errors");
const { authService, userService } = require("../services");
const ERROR = require("../constants/error");

const login = async (req, res, next) => {
  try {
    const { uniqueId, email, displayName, photoURL } = req.body;
    let user = await userService.getUserByEmail(email);

    if (!user) {
      user = await userService.createUser({
        uniqueId,
        email,
        displayName,
        photoURL,
      });

      return res.sendStatus(201);
    }
    const token = await authService.generateTokenByUser(user);

    return res.status(200).json({ user, token });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  login,
};
