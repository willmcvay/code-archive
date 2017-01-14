const webpack           = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const shared            = require( './webpack.shared.js' );

const loaders = [{
  test: /\.ts[x]?$/,
  loader: 'awesome-typescript-loader'
}, {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&localIdentName=[path]-[name]_[local]-[hash:base64:5]')
}, {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&localIdentName=[path]-[name]_[local]-[hash:base64:5]!sass-loader')
}, {
  test: /\.(jp[e]?g|png|gif|svg)$/i,
  loader: 'file-loader?name=img/[name].[ext]'
}, {
  test: /\.html$/,
  loader: 'file-loader?name=[name].[ext]'
}, {
  test: /\.ico$/,
  loader: 'file-loader?name=[name].[ext]'
}];

const client = {
  name: 'prod.client',
  target: 'web',
  entry: {
    'client.bundle': shared.APP_DIR + '/client'
  },
  output: {
    filename: '[name].js',
    path: shared.CLIENT_BUILD_DIR,
    publicPath: '/'
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
    }),

    new ExtractTextPlugin( '[name].css' )
  ]
};

const server = {
  name: 'prod.server',
  target: 'node',
  externals: [
    /^[a-z\-0-9]+$/, {
      'react-dom/server': true
    }
  ],
  entry: {
    'server.bundle': shared.APP_DIR + '/server'
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
    }),

    new ExtractTextPlugin( '[name].css' )
  ]
};

module.exports = [ client, server ];
