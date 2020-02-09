const passport = require("../services/passport");
const requireAuth = require("../middlewares/requireAuth");
const keys = require("../keys");

/**
 * AuthRouter - handles all authentication related routes
 */
const AuthRouter = require("express").Router();

AuthRouter.get("/", passport.authenticate("twitter"));

AuthRouter.get(`/callback`, passport.authenticate("twitter"), (req, res) => {
  res.redirect(keys.CLIENT_HOST);
});

AuthRouter.get("/current-user", requireAuth, (req, res) => {
  res.send(req.user.profile);
});

AuthRouter.get("/logout", requireAuth, (req, res) => {
  req.logout();
  res.redirect(keys.CLIENT_HOST);
});

module.exports = AuthRouter;
