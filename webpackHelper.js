const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const webpack = require('webpack');
const helpers = require("./helpers");
const packages = require('./package.json');

module.exports = class WebpackHelper {
  constructor(environment) {
    this.environment = environment;
    this.init();
  }

  init() {
    this.userExtractCssPlugin = new ExtractTextPlugin({
      filename: this.outputCssFileName,
      allChunks: true
    });

  }

  get isProduction() {
    return this.environment === 'PRODUCTION';
  }

  get isDevelopment() {
    return this.environment === 'DEVELOPMENT';
  }

  get outputFileName() {
    return this.isDevelopment ? 'js/[name].bundle.js' : 'js/[name].bundle.[chunkhash:8].min.js';
  }

  get outputChunkFilename() {
    return this.isDevelopment ? './build/js/[id].bundle.chunk.js' : './build/js/[id].bundle.chunk.[chunkhash:8].min.js';
  }

  get outputCssFileName () {
    return this.isDevelopment ? 'css/app.bundle.css' : 'css/app.bundle.[chunkhash:8].min.css';
  }

  get vendorOutputCssFileName() {
    return this.isDevelopment ? 'css/vendor.bundle.css' : 'css/vendor.bundle.[chunkhash:8].min.css';
  }

  get vendorExtractTextPlugin() {
    return this.vendorExtractCssPlugin;
  }

  get devTools() {
    return this.isDevelopment ? 'inline-source-map' : 'source-map';
  }

  get entries () {
    const vendorPackages = Object.keys(packages.dependencies).filter(d => d !== 'core-js');

    return {
      'app': './src/main.ts',
      'vendor': vendorPackages,
      'polyfills':  './src/polyfills.ts'
    };
  }

  get rules() {
    return [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: [ "ts-loader", "angular2-template-loader" ]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: "html-loader"
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [ "raw-loader", "sass-loader" ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|otf|ttf|eot|ico)$/,
        exclude: /node_modules/,
        use: "file-loader?name=assets/[name].[hash].[ext]"
      },
    ];
  }

  get plugins() {
    const plugins = [
      new webpack.NoEmitOnErrorsPlugin(),
      new ProgressBarPlugin({
        format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false
      }),

      new webpack.DefinePlugin({
          isDevelopment : JSON.stringify(this.isDevelopment),
          isProduction : JSON.stringify(this.isProduction),
      }),

      new HtmlWebpackPlugin({
        template: "src/index.html",
        chunksSortMode: 'dependency',
        fileName: "./index.html",
        hash: false,
        compile: true,
        favicon: false,
        cache: true,
        showErrors: true,
        chunks: "all",
        excludeChunks: [],

        minify: {
          removeComments: this.isProduction,
          collapseWhitespace: this.isProduction
        }
      }),

      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
        minChunks: Infinity,
        main: ['app']
      }),

      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        // location of your src
        helpers.root('src'), {
            // your Angular Async Route paths relative to this root directory
      })
    ];

    if (this.isProduction) {

      plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
      plugins.push(new webpack.NamedModulesPlugin());
      plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        minimize: true,
        beautify: false,
        mangle: { screw_ie8: true, keep_fnames: true },
        dead_code: true,
        unused: true,
        deadCode: true,
        comments: false,
        compress: {
          screw_ie8: true,
          keep_fnames: true,
          drop_debugger: false,
          dead_code: false,
          unused: false,
          warnings: false
        }
      }));
    }

      return plugins;
  }

  get node() {
    return {
      "fs": "empty",
      "global": true,
      "crypto": "empty",
      "tls": "empty",
      "net": "empty",
      "process": true,
      "module": false,
      "clearImmediate": false,
      "setImmediate": false
    };
  }

  get webpackDevServer() {
     return {
        historyApiFallback: true,
        stats: "verbose",
    };
  }
}

