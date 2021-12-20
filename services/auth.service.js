const { generateToken } = require("../lib/token");

const generateTokenByUser = async (user) => {
  const payload = {
    _id: user.uniqueId,
    email: user.email,
    displayName: user.displayName,
  };

  return generateToken(payload);
};

module.exports = {
  generateTokenByUser,
};
