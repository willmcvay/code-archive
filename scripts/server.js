const express = require('express');
const compress = require('compression');
const path = require('path');
const serverSideRendering = require('../public/server.js');

const server = express();
const port = process.env.PORT || 8080;

server.use(compress({ threshold: 0 }));
server.use(express.static(path.resolve(__dirname, '..', 'public')));
server.use((req, res) => {
  serverSideRendering.default(req, res);
});

server.listen(port, () => {
  console.log(`Server launched at port ${port}`);
});
