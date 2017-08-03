const chalk = require('chalk');
const packages = require('../package.json');
const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');


const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');


module.exports = class WebpackHelper {

  get entryPoints() {
    return ['manifest', 'polyfills', 'sw-register', 'styles', 'vendor', 'app'];
  }

  get entries() {
    const vendorPackages = Object.keys(packages.dependencies).filter(d => d !== 'core-js');

    return {
      'polyfills': './src/polyfills.ts',
      'app': './src/main.ts',
      'styles': [
        './src/styles.css'
      ],
      'vendor': vendorPackages,
    };
  }

  get output() {
    return {
      path: path.join(process.cwd(), 'build'),
      filename: this.isDevelopment ? 'js/[name].bundle.js' : 'js/[name].bundle.[chunkhash:8].min.js',
      chunkFilename: this.isDevelopment ? './build/js/[id].bundle.chunk.js' : './build/js/[id].bundle.chunk.[chunkhash:8].min.js'
    }
  }

  get devTools() {
    return this.isDevelopment ? 'inline-source-map' : 'source-map';
  }

  get resolve() {
    return {
      extensions: [".ts", ".js"]
    };
  }

  constructor(environment) {
    this.environment = environment;
  }

  get isProduction() {
    return this.environment === 'PRODUCTION';
  }

  get isDevelopment() {
    return this.environment === 'DEVELOPMENT';
  }

  get rules() {
    return [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: ["ts-loader", "angular2-template-loader"]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: "html-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|otf|ttf|eot|ico)$/,
        exclude: /node_modules/,
        use: "file-loader?name=assets/[name].[hash].[ext]"
      },
      {
        "exclude": [
          path.join(process.cwd(), "src\\styles.css")
        ],
        "test": /\.css$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": this.postcssPlugins
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src\\styles.css")
        ],
        "test": /\.scss$|\.sass$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": this.postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src\\styles.css")
        ],
        "test": /\.css$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": this.postcssPlugins
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src\\styles.css")
        ],
        "test": /\.scss$|\.sass$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": this.postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
    ];
  }

  get postcssPlugins() {
    // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
    const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
    const minimizeOptions = {
      autoprefixer: false,
      safe: true,
      mergeLonghand: false,
      discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
    };

    return [
      postcssUrl({
        url: (URL) => {
          // Only convert root relative URLs, which CSS-Loader won't process into require().
          if (!URL.startsWith('/') || URL.startsWith('//')) {
            return URL;
          }
          if (deployUrl.match(/:\/\//)) {
            // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
            return `${deployUrl.replace(/\/$/, '')}${URL}`;
          }
          else if (baseHref.match(/:\/\//)) {
            // If baseHref contains a scheme, include it as is.
            return baseHref.replace(/\/$/, '') +
              `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
          }
          else {
            // Join together base-href, deploy-url and the original URL.
            // Also dedupe multiple slashes into single ones.
            return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
          }
        }
      }),
      autoprefixer(),
    ].concat(this.isProduction ? [cssnano(minimizeOptions)] : []);
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
      port: 4200,
      historyApiFallback: true,
      stats: this.stats,
    };
  }

  get stats() {
    return {
      colors: true,
      hash: false,
      version: true,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      reasons: true,
      children: true,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: true,
      cached: false,
      cachedAssets: false,
      chunkModules: false,
      chunkOrigins: false,
      depth: false,
      entrypoints: false,
      performance: false,
      providedExports: false,
      usedExports: false,
      maxModules: 0,
    };
  }

}

