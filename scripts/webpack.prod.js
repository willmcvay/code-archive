const webpack = require( 'webpack' );
const shared  = require( './webpack.shared.js' );

const loaders = [{
  test: /\.ts[x]?$/,
  loader: 'awesome-typescript-loader'
}];

const server = {
  name: 'prod.server',
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
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: loaders
  },
  resolve: {
    extensions: [ '', '.js', '.jsx', '.ts', '.tsx' ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify( 'production' )
      }
    })
  ]
};

module.exports = [ server ];
