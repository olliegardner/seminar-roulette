var path = require("path");

module.exports = {
  watch: false,
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "static"),
    publicPath: "static/",
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
};
