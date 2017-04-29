const webpack      = require( 'webpack' );
const WebpackDevServer = require( 'webpack-dev-server' );
const configClient     = require( './webpack.dev.client.js' );
const configServer     = require( './webpack.dev.server.js' );

const options = {
  chunk       : false,
  chunkModules: false,
  modules     : false,
  source      : false,
  chunkOrigins: false,
  quiet       : true
};

new WebpackDevServer( webpack( configClient ), {
  hot: true,
  historyApiFallback: true,
  stats: options
}).listen( 8000, 'localhost', ( err ) => {
  if(err) console.log( `Webpack client bundle error: ${ err }` );

  console.log( 'Webpack client server launched with at localhost:8000 [HMR] enabled)' );
});

webpack( configServer ).watch( {}, ( err, stats ) => {
  if( err ) return console.error( `Webpack server bundle error: ${ err.message }` );

  console.log( `Webpack server bundle success: ${ stats.toString( options ) }` );
});
