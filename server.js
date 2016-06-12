'use strict'

const express = require('express');
const app = express();
const port = (process.env.PORT || 3000);
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const webpackServer = new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true
});

webpackServer.listen(8000, 'localhost', function (err) {
	if (err) {
    return console.log(err);
  }
  console.log(`Webpack server running on port: 8000`);
});

app.use(express.static(`${__dirname}/client`));

app.get('/*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/index.html`));
});

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});

module.exports = app;
