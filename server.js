'use strict';

require( 'babel-register' )({
  presets: [ 'es2015', 'react' ]
});

const express          = require( 'express' );
const app              = express();
const port             = ( process.env.PORT || 3000 );
const webpack          = require( 'webpack' );
const WebpackDevServer = require( 'webpack-dev-server' );
const config           = require( './webpack.config' );
const serverApp        = require( './server/app/serverApp.js' );

if ( process.env.NODE_ENV !== 'PROD' ) {
  const webpackServer = new WebpackDevServer( webpack( config ), {
    publicPath        : config.output.publicPath,
    hot               : true,
    quiet             : true,
    historyApiFallback: true
  });

  webpackServer.listen( 8000, 'localhost', ( err ) => {
    if ( err ) {
      return console.log( err );
    }
    console.log( 'Webpack server running on port: 8000' );
  });
}

app.use( express.static( `${__dirname}/dist` ) );
app.use( '/', serverApp() );

app.listen( port, () => {
  console.log( `Server running on port: ${port}` );
});

module.exports = app;
