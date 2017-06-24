var webpackConfig = require("./webpack/webpack.config.karma");

module.exports = function (config) {
  var _config = {
    basePath: "",

    frameworks: ["jasmine"],

    files: [
      { pattern: "./karma/karma-test-shim.js", watched: false }
    ],

    preprocessors: {
      "./karma/karma-test-shim.js": ["webpack", "sourcemap"]
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: "errors-only"
    },

    webpackServer: {
      noInfo: true
    },

    reporters: ["progress", "kjhtml", "karma-typescript"],
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  };

  config.set(_config);
};
