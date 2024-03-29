const net = require('net');

// Create server
const server = net.createServer();

server.on('connection', (socket) => {
  console.log('A new connection to the server');

  socket.on('data', (data) => {
    socket.write(data);
    console.log('[SOCKET]:[DATA] ---- > ', data.toString('utf-8'));
  });

  // socket.end('goodbye\n');
});

server.on('close', (message) => {
  console.log('[CLOSE]:[MESSAGE] ----> ', message);
});

server.on('error', () => {
  error;
});

server.listen(3008, '127.0.0.1', () => {
  console.log('opened server on', server.address());
});
