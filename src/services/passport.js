const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const keys = require("../keys");

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.CONSUMER_API_KEY,
      consumerSecret: keys.CONSUMER_API_SECRET_KEY,
      callbackURL: "http://localhost:5000/auth/callback",
      passReqToCallback: true,
      proxy: true
    },
    (req, token, tokenSecret, profile, done) => {
      console.log("header", req.header("host"));
      return done(null, { profile, token, tokenSecret });
    }
  )
);
passport.serializeUser(function(user, cb) {
  console.log("SERIALIZE");
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  console.log("DESERIALIZE");
  cb(null, obj);
});

module.exports = passport;
