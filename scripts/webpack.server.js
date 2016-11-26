'use strict';

const webpack = require('webpack');
const ProgressPlugin = require('progress-bar-webpack-plugin');
const constants = require('./constants');
const isProd = process.env.NODE_ENV === 'PROD';
var path = require("path");

const getEntry = () => {
  if (isProd) {
    return [
      constants.PROD_BUNDLE_SERVER
    ];
  }

  return [

    constants.BUNDLE_PATH_SERVER
  ];
};

const getPlugins = () => {
  if (isProd) {
    return [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ];
  }

  return [];
};

module.exports = {
  // entry: getEntry(),
  devtool: 'source-map',
  target: 'node',
   externals: [
		/^[a-z\-0-9]+$/, {
			"react-dom/server": true
		}
	],
  entry: path.resolve(__dirname, './../server/app/serverApp.tsx'),
  // entry: './../server/app/serverApp.tsx',
  output: {
    path: `./../public/js`,
    publicPath: 'http://localhost:3000/',
    filename: 'server.js',
    libraryTarget: "commonjs2"
  },
  plugins: getPlugins(),
  resolve: {
    extensions: ['', '.js', '.ts', 'tsx']
  },
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /.ts[x]?$/,
      loaders: ['awesome-typescript-loader', 'react-hot-loader/webpack'],
      exclude: /node_modules/
    }]
  }
};
