const shared = require('./webpack.shared.js');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
  name: 'client',
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  entry: './src/client/index.tsx',
  output: {
    filename: 'client.js',
    path: shared.CLIENT_BUILD_DIR,
    publicPath: 'http://localhost:8080/'
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
};