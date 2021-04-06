const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const server = Hapi.server({
  port: 5000,
  host: process.env.hostname || 'localhost',
  routes: {
    cors: {
      origin: ['*'],
    },
  },
});

server.route(routes);

module.exports = server;