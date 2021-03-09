var serverFactory = require('spa-server');

var server = serverFactory.create({
  path: './dist',
  port: 3010,
  fallback: '/index.html'
});

server.start();
