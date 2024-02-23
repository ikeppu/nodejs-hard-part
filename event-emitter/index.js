const EventEmmiter = require('events');

class Emitter extends EventEmmiter {}

const myE = new Emitter();

myE.on('foo', () => {
  console.log('Event occured [1]');
});

myE.on('foo', (data) => {
  console.log('Event occured [2]');
  console.log(data);
});

myE.on('bar', () => {
  console.log('An event occured bar.');
});

myE.on('foo', (data) => {
  console.log('Event occured [3]');
});

myE.emit('foo', { hello: 'world' });
myE.emit('foo');
myE.emit('bar');
