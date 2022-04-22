const { merge } = require("webpack-merge");
const base = require("./base");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: "game.min.js",
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 9000000,
    maxAssetSize: 9000000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
});
