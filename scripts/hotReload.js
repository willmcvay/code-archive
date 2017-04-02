const webpack      = require( 'webpack' );
const configServer = require( './webpack.dev.server.js' );
const fsbx         = require('fuse-box');

const options = {
  chunk       : false,
  chunkModules: false,
  modules     : false,
  source      : false,
  chunkOrigins: false,
  quiet       : true
};

new fsbx.FuseBox({
  homeDir: "src/",
  outFile: "public/client.js",
  sourceMaps: true
}).devServer(">client/index.tsx");

webpack( configServer ).watch( {}, ( err, stats ) => {
  if( err ) return console.error( `Webpack server bundle error: ${ err.message }` );

  console.log( `Webpack server bundle success: ${ stats.toString( options ) }` );
});
