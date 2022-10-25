const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const secret = process.env.SECRET;

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const strategy = new JWTStrategy(options, async (payload, done) => {
  try {
    console.log("inside the callback function");
    done(null, true);
  } catch (error) {
    done(error, false);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
