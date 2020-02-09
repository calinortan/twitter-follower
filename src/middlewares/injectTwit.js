const Twit = require("twit");
const keys = require("../keys");

module.exports = (req, res, next) => {
  const twitterApi = new Twit({
    consumer_key: keys.CONSUMER_API_KEY,
    consumer_secret: keys.CONSUMER_API_SECRET_KEY,
    access_token: req.user.token,
    access_token_secret: req.user.tokenSecret
  });

  req.twitterApi = twitterApi;

  next();
};
