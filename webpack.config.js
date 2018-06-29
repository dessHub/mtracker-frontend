const path = require("path");

module.exports = {
  entry: {
    controller: "./assets/js/controller.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].min.js"
  },
  module:{
      loaders: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: "eslint-loader",
          },
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: "babel-loader",
              query: {
                  presets: ["es2015"]
              }
          }
      ]
  }
};
