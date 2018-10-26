const webpack        = require( 'webpack' );
const ProgressPlugin = require( 'webpack/lib/ProgressPlugin' );
const config         = require( './webpack.prod.js' );
const compiler       = webpack(config);

compiler.apply( new ProgressPlugin( ( percentage, log ) => {
  process.stdout.clearLine();
  process.stdout.cursorTo( 0 );
  process.stdout.write( `${ Math.floor( percentage * 100 ) }% ${ log }` );
}));

compiler.run( ( err, stats ) => {
  if( err ) return console.error( `Webpack production bundle error: ${ err.message }` );

  console.log( `Webpack production bundle error: ${ stats.toString( { colors: true } ) }`);
});