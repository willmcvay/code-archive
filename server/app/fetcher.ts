const actions       = require( '../actions' );
const getActionKeys = ( renderProps ) => {
  // const actionKeys  = [];

  return renderProps.components.map( ( component ) => {
    return component.actionKeys || [];
    // return actionKeys.concat( component.actionKeys || [] );
  });
};


module.exports = ( renderProps ) => {
  const actionKeys = getActionKeys( renderProps );
  // const responses  = [];
  console.log( 'keys', actionKeys );
  return actionKeys.map( ( key ) => {
    return actions[ key ];
  });
};
