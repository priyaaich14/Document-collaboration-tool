const passport = require("passport");
const { ExtractJwt, Strategy: JWTStrategy } = require("passport-jwt");

const User = require("../models/user.model");

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtSecretHeader = process.env.JWT_SECRET_HEADER;

const jwtConfig = {
  jwtFromRequest: ExtractJwt.fromHeader(jwtSecretHeader),
  secretOrKey: jwtSecretKey,
};

const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findById(payload._id);

    if (user) {
      done(null, user);
      return;
    }
    done(null, false, { reason: "올바르지 않은 인증정보 입니다." });
  } catch (error) {
    done(error);
  }
};

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use("jwt", new JWTStrategy(jwtConfig, jwtVerify));
};
