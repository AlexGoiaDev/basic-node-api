// eslint-disable-next-line import/order
const moment = require('moment');
const { io } = require('../app');

let connected = 0;

io.on('connection', (client) => {
  connected += 1;
  console.log('Cliente conectado', connected);
  client.broadcast.emit('connected');

  client.on('disconnect', () => {
    console.log('Client desconectado');
    connected -= 1;
    client.broadcast.emit('connected');
  });

  // Escuchar al cliente
  client.on('hello', (data) => {
    console.log(`Hello from ${data.location.latitude}, ${data.location.longitude}`);
    client.emit('helloThere', {
      message: 'Hello!!',
    });
  });

  client.on('mimimi', (data) => {
    console.log('mimimi', data);
    client.emit('mimimi', {
      message: 'Mimimi',
      date: moment().format('HH:MM:ss'),
    });
  });
});
