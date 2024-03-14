console.log('Buffer ----->');

// Buffer very similar with array
// Buffer have index [0][1][2][3]

const { Buffer } = require('buffer');

const memoryContainer = Buffer.alloc(4); // 4 bytes (32bytes)

//min 0 max 255 we can store in buffer

memoryContainer[0] = 0xf4;
memoryContainer[1] = 0x34;
// memoryContainer[2] = 0xb6;
memoryContainer.writeInt8(-34, 2);
memoryContainer[3] = 0xff;

console.log({ memoryContainer });

console.log(memoryContainer.readInt8(2));

const buff = Buffer.from([0x48, 0x69, 0x21]);
const buffString = Buffer.from('Hello world', 'utf-8');
console.log(buff.toString('utf-8'));
console.log(buffString.toString('utf-8'));

// 1e9 1,000,000,000 (1GB)

// f

// Fill all buffer with some data
// buff.fill()

console.log(Buffer.poolSize >>> 1);

const testBuffer = Buffer.alloc(1);

testBuffer[0] = 0x010100101;

console.log(testBuffer.toString('utf-8'));
