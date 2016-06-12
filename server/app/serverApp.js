'use strict';

const hist = require('history');
const express = require( 'express' );
const router = express.Router();
const React = require( 'react' );
const ReactDOM = require( 'react-dom/server' );
const RoutingContext = require( 'react-router' ).RoutingContext;
const match = require( 'react-router' ).match;
const routes = require( '../routes/routes.jsx' );

let markup, location;

const serverApp = () => {

  router.use((req, res, next) => {

    location = hist.createLocation(req.path);

    match({
      routes: routes,
      location: location,
    }, (err, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      } else if (err) {
        next(err);
        res.send(500, error.message);
      } else if (renderProps === null) {
        res.status(404)
          .send('Not found');
      } else {
        markup = ReactDOM.renderToString(<RoutingContext {...renderProps}/>);
        res.send(markup);
      }
    });
  });
  return router;
};

module.exports = serverApp;
