const expresSession = require("express-session");

module.exports = () =>
  expresSession({
    secret: "ultra_safe_secret",
    resave: false,
    saveUninitialized: false
  });
