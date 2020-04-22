// eslint-disable-next-line import/order
const moment = require('moment');
const { io } = require('../app');


io.on('connection', (client) => {
  client.on('disconnect', () => {
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
