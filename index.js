const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("./src/services/passport");
const sessionMiddleware = require("./src/middlewares/session");
const cors = require("cors");

const authRoutes = require("./src/routes/auth");
const twitterRoutes = require("./src/routes/twitter");

const app = express();
app.use(cors());

// apply app level middlewares
app.use(logger("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

// Routes configuration
app.use("/auth", authRoutes);
app.use("/twitter", twitterRoutes);

app.get("/", (req, res) => {
  res.send("<h3>Hello World from Twitter Bot Api</h3>");
});

app.get("*", (req, res) => {
  res.status(404).send({ error: "Not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => "Twitter Follower started at port " + PORT);
