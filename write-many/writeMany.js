const fs = require('node:fs/promises');

// ********** When you copy a file
//  PC First for all is to move file to memory and after to the new location

// 8bits = 1byte
// 1000bytes = 1kilobyte
// 1000kilobyte = 1mb

// 1a => 0000 0000

// Writable stream
// Readable stream
// Transform stream

(async () => {
  console.time('writeMany');
  const fileHandle = await fs.open('./test.txt', 'w');
  const stream = fileHandle.createWriteStream();

  // // Video, image anything any 01
  const numberOfWrites = 100000000;
  let i = 0;
  const writeMany = () => {
    while (i <= numberOfWrites) {
      const buff = Buffer.from(` ${i} `, 'utf-8');
      i++;
      if (i === numberOfWrites - 1) {
        return stream.end(buff);
      }
      // if streams write return false stop the loop
      if (!stream.write(buff)) break;
    }
  };

  writeMany();
  // drain event w
  // resume our loop
  stream.on('drain', () => {
    // console.log('Draining!!');
    writeMany();
  });

  stream.on('finish', () => {
    console.timeEnd('writeMany');
    fileHandle.close();
  });
})();
