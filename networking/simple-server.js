const net = require('net');
// TCP REQUESTS
const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log('DATA ----->', data);
  });
});

server.listen(3099, '127.0.0.1', () => {
  console.log('opened server on ', server.address());
});
