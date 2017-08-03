const helpers = require("./helpers");
const { CommonsChunkPlugin, OccurrenceOrderPlugin, UglifyJsPlugin } = require('webpack').optimize;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const {
  NamedModulesPlugin,
  ContextReplacementPlugin,
  NoEmitOnErrorsPlugin,
   DefinePlugin
} = require('webpack');

const WebpackHelper = require("./webpackHelper");

module.exports = class WebpackDevHelper extends WebpackHelper {

  constructor(environment) {
    super(environment);
  }

  get plugins() {
    const plugins = [
      new NoEmitOnErrorsPlugin(),
      // new ProgressBarPlugin({
      //   format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      //   clear: false
      // }),

      new DefinePlugin({
        environmentName: JSON.stringify(this.environment),
      }),

      new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunksSortMode: (left, right) => {
          let leftIndex = this.entryPoints.indexOf(left.names[0]);
          let rightindex = this.entryPoints.indexOf(right.names[0]);
          if (leftIndex > rightindex) {
            return 1;
          }
          else if (leftIndex < rightindex) {
            return -1;
          }
          else {
            return 0;
          }
        },
        fileName: './index.html',
        hash: false,
        compile: false,
        favicon: false,
        cache: false,
        showErrors: true,
        chunks: "all",
        excludeChunks: [],

        minify: {
          removeComments: this.isProduction,
          collapseWhitespace: this.isProduction
        }
      }),

      new CommonsChunkPlugin({
        "name": [
          "manifest"
        ],
        "minChunks": null
      }),

      new CommonsChunkPlugin({
        "name": [
          "vendor"
        ],
        "minChunks": (module) => {
                  return module.resource
                      && (module.resource.startsWith(nodeModules)
                          || module.resource.startsWith(genDirNodeModules)
                          || module.resource.startsWith(realNodeModules));
              },
        "chunks": [
          "main"
        ]
      }),

      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        // location of your src
        helpers.root('src'), {
          // your Angular Async Route paths relative to this root directory
        })
    ];

    if (this.isProduction) {

      plugins.push(new OccurrenceOrderPlugin());
      plugins.push(new NamedModulesPlugin());
      plugins.push(new UglifyJsPlugin({
        sourceMap: true,
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

}
