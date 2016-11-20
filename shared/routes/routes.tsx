'use strict';

const React = require( 'react' );
const Route = require( 'react-router' ).Route;
const IndexRoute = require( 'react-router' ).IndexRoute;
const AppWrapper = require( '../../client/components/AppWrapper.jsx' );

module.exports = () => {
  return (
    <Route path="/" component={AppWrapper}>

    </Route>
  );
};
