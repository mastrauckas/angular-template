var webpack = require("webpack");
var helpers = require("./helpers");
const WebpackKarmaHelper = require("./webpackKarmaHelper");

const environment = process.env.NODE_ENV.toUpperCase();
const webpackKarmaHelper = new WebpackKarmaHelper(environment);

module.exports = {
  devtool: 'source-map',

  resolve: webpackKarmaHelper.resolve,

  module: {
    rules: webpackKarmaHelper.rules
  },

  plugins: webpackKarmaHelper.plugins,
};
