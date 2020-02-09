const path = require("path");
const nodeWebExternals = require("webpack-node-externals");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");

console.log(path.resolve(__dirname, "build"));

module.exports = merge(baseConfig, {
  target: "node",
  externals: [nodeWebExternals()],
  entry: "./src/index.js",
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "build")
  }
});
