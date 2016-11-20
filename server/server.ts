'use strict';

const express   = require( 'express' );
const app       = express();
const port      = ( process.env.PORT || 3000 );
const serverApp = require( './app/serverApp.tsx' );

app.use( express.static( `${__dirname}/dist` ) );
app.use( '/', serverApp() );

app.listen( port, () => {
  console.log( `Server running on port: ${port}` );
});

module.exports = app;
