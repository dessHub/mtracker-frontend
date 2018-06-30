const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    auth: "./assets/js/auth.js",
    createRequest: "./assets/js/createRequest.js",
    viewRequests: "./assets/js/viewRequests.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].min.js"
  },
  module:{
      rules: [
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