const path = require( 'path' );

exports.CLIENT_BUILD_DIR = path.resolve( __dirname, '..', 'public', 'js', 'client' );
exports.SERVER_BUILD_DIR = path.resolve( __dirname, '..', 'public', 'js', 'server' );
exports.APP_DIR          = path.resolve( __dirname, '..', 'src');
