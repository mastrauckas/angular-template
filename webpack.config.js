//To run in production, put in
//NODE_ENV=production webpack
const path = require('path');
const WebpackHelper = require("./webpackHelper");

const environment = process.env.NODE_ENV.toUpperCase();

const PRODUCTION = environment === 'PRODUCTION';
const DEVELOPMENT = environment === 'DEVELOPMENT';

const webpackHelper = new WebpackHelper(environment);

const colors = {
  reset: '\x1b[0m',
  fg: {
    red: '\x1b[31m'
  }
};

console.log(colors.fg.red, `Building in ${environment} mode.`, colors.reset);

module.exports = {

  devtool: webpackHelper.devTools,
  entry: webpackHelper.entries,

  resolve: {
    extensions: ['.js', '.ts']
  },

  output: {
    path: path.join(process.cwd(), 'build'),
    filename: webpackHelper.outputFileName,
    chunkFilename: webpackHelper.outputChunkFilename,
  },

  module: {
    rules: webpackHelper.rules
  },

  plugins: webpackHelper.plugins,
  devServer: webpackHelper.webpackDevServer,
  node: webpackHelper.node,

};
