const webpack = require( 'webpack' );
const config  = require( './webpack.server.js' );

const options = {
	chunk: false,
	chunkModules: false,
	modules: false,
	source: false,
	chunkOrigins: false
};

const compiler = webpack( config );

compiler.run(function(err, stats) {
	if(err) return console.error(err.message);

	console.log(stats.toString(options));
});
