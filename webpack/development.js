const { merge } = require("webpack-merge");
const base = require("./base");

module.exports = merge(base, {
  mode: "development",
  devServer: {
    host: "127.0.0.1",
  },
});
