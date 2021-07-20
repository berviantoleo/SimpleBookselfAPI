import Hapi from '@hapi/hapi';
import routes from './routes';

const server = Hapi.server({
  port: process.env.PORT || 5000,
  host: process.env.hostname || 'localhost',
  routes: {
    cors: {
      origin: ['*'],
    },
  },
});

server.route(routes);

export default server;
