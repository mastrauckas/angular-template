var webpack = require("webpack");
var helpers = require("./helpers");

const environmentName = process.env.NODE_ENV.toUpperCase();

module.exports = {
  devtool: "inline-source-map",

  resolve: {
    extensions: [".ts", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader", "angular2-template-loader"]
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["raw-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: "null-loader"
      },
      {
        test: /\.css$/,
        exclude: helpers.root("src", "app"),
        use: "null-loader"
      },
      {
        test: /\.css$/,
        include: helpers.root("src", "app"),
        use: "raw-loader"
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      environmentName: JSON.stringify(environmentName),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.UglifyJsPlugin({
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
    }),
    // Workaround for Angular-SystemJS-Webpack(2) WARNINGS
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('src'), // location of your src
      {
        // your Angular Async Route paths relative to this root directory
      }
    ),
  ]
};
