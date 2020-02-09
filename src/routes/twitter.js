const injectTwit = require("../middlewares/injectTwit");
const requireAuth = require("../middlewares/requireAuth");

/**
 * TwitterRouter - handles all requests which use twitter api
 */
const TwitterRouter = require("express").Router();

TwitterRouter.use(requireAuth, injectTwit);

TwitterRouter.get("/users", requireAuth, injectTwit, (req, res) => {
  req.twitterApi.get(
    "users/search",
    { q: encodeURIComponent("description:Twitter") },
    (err, data) => {
      res.send(data);
    }
  );
});

module.exports = TwitterRouter;
