const fs = require('node:fs/promises');

(async () => {
  const fileHandleRead = await fs.open('test.txt', 'r');
  const fileHandleWrite = await fs.open('dest.txt', 'w');

  const stream = fileHandleRead.createReadStream({ highWaterMark: 62 * 1024 });
  const streamWrite = fileHandleWrite.createWriteStream();

  stream.on('data', (chunk) => {
    console.log('---------');
    if (!streamWrite.write(chunk)) {
      console.log('PAUSED');
      stream.pause();
    }
  });

  streamWrite.on('drain', () => {
    console.log('RESUMED');
    stream.resume();
  });
})();
