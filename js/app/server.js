const express = require('express');
const app = express();
const port = (process.env.PORT || 3000);
const path = require('path');

app.use(express.static(__dirname + './../../public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, function () {
	console.log('Server running on port: ' + port);
});

module.exports = app;