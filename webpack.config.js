//To run in production, put in
//NODE_ENV=production webpack
const WebpackDevHelper = require("./webpack/webpackDevHelper");

const environment = process.env.NODE_ENV.toUpperCase();
const webpackHelper = new WebpackDevHelper(environment);

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
  output: webpackHelper.output,

  resolve: {
    extensions: ['.js', '.ts']
  },

  stats: webpackHelper.stats,

  module: {
    rules: webpackHelper.rules
  },

  plugins: webpackHelper.plugins,
  devServer: webpackHelper.webpackDevServer,
  node: webpackHelper.node,

};
