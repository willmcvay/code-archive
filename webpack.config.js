const webpack = require('webpack');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8000/',
		'webpack/hot/only-dev-server',
		'./client/app/client'
	],
	devtool: 'eval',
	output: {
		path: `${__dirname}/dist/js/`,
		publicPath: '/dist/js/',
		filename: 'app.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			loaders: ['react-hot']
		},
		{
			test: /.jsx?$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ['es2015', 'react', 'stage-0']
			}
		}]
	}
};
