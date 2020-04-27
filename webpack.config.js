const webpack = require('webpack');
const path = require("path");
const GasPlugin = require("gas-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "src", "index.ts"),
  },
  devtool: false,
  output: {
    filename: "AA_bundle.js",
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  plugins: [
    new GasPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
