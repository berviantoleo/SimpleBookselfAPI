import server from './server';

const init = async () => {
  await server.start();
   
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
