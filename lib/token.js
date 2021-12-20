const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiresIn = process.env.JWT_SECRET_EXPIRES_IN;

function generateToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      jwtSecretKey,
      { expiresIn: jwtExpiresIn },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecretKey, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });
}

module.exports = {
  generateToken,
  verifyToken,
};
