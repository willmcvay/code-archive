'use strict';

const webpack        = require( 'webpack' );
const ProgressPlugin = require( 'progress-bar-webpack-plugin' );
const constants      = require( './constants' );
const isProd         = process.env.NODE_ENV === 'PROD';

const getEntry = () => {
  if ( isProd ) {
    return [
      constants.PROD_BUNDLE_SERVER
    ];
  }

  return [
    constants.BUNDLE_PATH_SERVER
  ];
};

const getPlugins = () => {
  if ( isProd ) {
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
  entry  : getEntry(),
  devtool: 'source-map',
  target : 'node',
  output : {
    path      : `${__dirname}/server/`,
    publicPath: 'http://localhost:3000/',
    filename  : 'server.js',
		libraryTarget: "commonjs2"
  },
  plugins: getPlugins(),
  resolve: {
    extensions: [ '', '.js', '.ts', 'tsx' ]
  },
  module: {
    loaders: [
    {
      test   : /.ts[x]?$/,
      loaders: ['awesome-typescript-loader', 'react-hot-loader'],
      exclude: /node_modules/
    } ]
  }
};
