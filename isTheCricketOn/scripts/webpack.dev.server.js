const shared = require('./webpack.shared.js');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const server = {
  name: 'server',
  target: 'node',
  externals: [
    /^[a-z\-0-9]+$/, {
      'react-dom/server': true
    }
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  entry: {
    'server': shared.APP_DIR + '/server'
  },
  output: {
    filename: 'server.js',
    path: shared.SERVER_BUILD_DIR,
    publicPath: 'http://localhost:8000/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader'
    }]
  },
  plugins: [
    new ProgressBarPlugin()
  ]
}

module.exports = server;
