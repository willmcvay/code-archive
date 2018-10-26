const webpack = require( 'webpack' );
const config  = require( './webpack.dev.server.js' );

const options = {
  chunk       : false,
  chunkModules: false,
  modules     : false,
  source      : false,
  chunkOrigins: false,
  quiet       : true
};
const compiler = webpack(config);

compiler.run( ( err, stats ) => {
  if( err )
    return console.error( `Compile error: ${ err.message }` );

  console.log( stats.toString( options ) );
});
