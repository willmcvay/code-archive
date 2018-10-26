const webpack = require('webpack');
const shared = require('./webpack.shared.js');

const client = {
  name: 'client',
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  entry: './src/client/index.tsx',
  output: {
    filename: 'client.js',
    path: shared.CLIENT_BUILD_DIR,
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader'
    }]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};

const server = {
  name: 'server',
  target: 'node',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  externals: [
    /^[a-z\-0-9]+$/, {
      'react-dom/server': true
    }
  ],
  entry: './src/server/index.tsx',
  output: {
    filename: 'server.js',
    path: shared.SERVER_BUILD_DIR,
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader'
    }]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};

module.exports = [server, client];
