const shared = require( './webpack.shared.js' );

const loaders = [{
  test: /\.ts[x]?$/,
  loaders: [
    'react-hot-loader',
    'awesome-typescript-loader'
  ]
}];

const server = {
  name: 'dev.server',
  target: 'node',
  externals: [
    /^[a-z\-0-9]+$/, {
      'react-dom/server': true
    }
  ],
  entry: {
    'server': shared.APP_DIR + '/server'
  },
  output: {
    filename: '[name].js',
    path: shared.SERVER_BUILD_DIR,
    publicPath: 'http://localhost:8000/',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: loaders
  },
  resolve: {
    extensions: [ '', '.js', '.jsx', '.ts', '.tsx' ]
  }
};

module.exports = server;
