const testData = require( '../../test.json' );

module.exports = {
  matchActions() {
    return new Promise( ( resolve ) => {
      return resolve( testData );
    });
  }
};
