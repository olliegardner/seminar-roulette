const Dotenv = require("dotenv-webpack");

module.exports = {
  watch: false,
  devtool: false,
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  node: {
    fs: "empty",
  },
  plugins: [
    new Dotenv({
      path: "../.env",
    }),
  ],
};
