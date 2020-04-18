// eslint-disable-next-line import/order
const { io } = require('../app');

io.on('connection', (client) => {
  console.log('Someone connected to hello', client.id);
  client.emit('yourId', {
    id: client.id,
  });

  client.on('disconnect', () => {
    console.log('Client desconectado');
  });

  // Escuchar al cliente
  client.on('hello', (data) => {
    console.log(`${data.email} ${data.id} said hello`);
  });
});
