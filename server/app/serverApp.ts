'use strict';

const history       = require( 'history' );
const express       = require( 'express' );
const router        = express.Router();
const React         = require( 'react' );
const ReactDOM      = require( 'react-dom/server' );
const RouterContext = require( 'react-router' ).RouterContext;
const match         = require( 'react-router' ).match;
const routes        = require( '../routes/routes.jsx' );
const constants     = require( '../../constants' );
const fetcher       = require( './fetcher' );
const template      = require( './template' );
const bundlePath    = process.env.NODE_ENV === 'PROD' ? constants.PROD_BUNDLE : constants.DEV_BUNDLE;

let markup;
let location;
let appData;

module.exports = () => {
  router.use( ( req, res, next ) => {
    location = history.createMemoryHistory().createLocation( req.path );

    match({
      routes  : routes(),
      location: location.pathname
    }, ( err, redirectLocation, renderProps ) => {
      if ( redirectLocation ) {
        return res.redirect( 301, `${redirectLocation.pathname}${redirectLocation.search}` );
      }

      if ( err ) {
        next( err );
        return res.send( 500, err.message );
      }

      if ( !renderProps ) {
        return res.status( 404 ).send( 'This is not the page you\'re looking for... move along...' );
      }

      appData = fetcher( renderProps );

      Promise.all( appData )
        .then( ( responses ) => {
          markup = ReactDOM.renderToString( <RouterContext {...renderProps} /> );
          console.log( 'Rendering page on server' );
          return res.send( template( markup, bundlePath, JSON.stringify( responses ) ) );
        })
        .catch( ( error ) => {
          console.error( `Failed to fetch appData: ${error}` );
          return res.send( template( 'Oops, something went wrong...' ) );
        });
    });
  });
  return router;
};
