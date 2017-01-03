var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src/client');

var config = {
  entry: [
    'webpack-hot-middleware/client',
    APP_DIR + '/index.js',
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/static/', // may need 'assets' here
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  externals: { // these will help enzyme work properly
    'cheerio': 'window', // importing the cheerio library
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'react-hot!babel',
        // loaders: ['react-hot', 'babel'],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
};

module.exports = config;

