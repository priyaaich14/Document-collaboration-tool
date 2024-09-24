import passport = from "passport");
import { ExtractJwt, Strategy: JWTStrategy } = from "passport-jwt");

import User = from "../models/user.model");

import jwtSecretKey = process.env.JWT_SECRET_KEY;
import jwtSecretHeader = process.env.JWT_SECRET_HEADER;

import jwtConfig = {
  jwtFromRequest: ExtractJwt.fromHeader(jwtSecretHeader),
  secretOrKey: jwtSecretKey,
};

import jwtVerify = async (payload, done) => {
  try {
    import user = await User.findById(payload._id);

    if (user) {
      done(null, user);
      return;
    }
    done(null, false, { reason: "올바르지 않은 인증정보 입니다." });
  } catch (error) {
    done(error);
  }
};

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use("jwt", new JWTStrategy(jwtConfig, jwtVerify));
};
