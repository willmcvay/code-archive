'use strict';

const webpack        = require( 'webpack' );
const ProgressPlugin = require( 'progress-bar-webpack-plugin' );
const constants      = require( './constants' );
const isProd         = process.env.NODE_ENV === 'PROD';

const getEntry = () => {
  if ( isProd ) {
    return [
      constants.BUNDLE_PATH
    ];
  }

  return [
    constants.WEBPACK_DEV_ENTRY,
    constants.WEBPACK_HOT_RELOADER,
    constants.BUNDLE_PATH
  ];
};

const getPlugins = () => {
  if ( !isProd ) {
    return [
      new ProgressPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ];
  }

  return [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ];
};

module.exports = {
  entry  : getEntry(),
  devtool: 'source-map',
  output : {
    path      : `${__dirname}../public/js/`,
    publicPath: '../public/js/',
    filename  : 'app.js'
  },
  plugins: getPlugins(),
  resolve: {
    extensions: [ '', '.js', '.ts', 'tsx' ]
  },
  module: {
    loaders: [{
      test: /\.json$/, 
      loader: 'json'
    },
    {
      test   : /.ts[x]?$/,
      loaders : ['awesome-typescript-loader','react-hot-loader/webpack'],
      exclude: /node_modules/
    } ]
  }
};
