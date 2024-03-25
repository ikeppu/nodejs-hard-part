const fs = require('node:fs/promises');

(async () => {
  console.time('copy');

  const srcFile = await fs.open('./test.txt', 'r');
  const destFile = await fs.open('text-copy.txt', 'w');

  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();

  readStream.pipe(writeStream);

  readStream.on('end', () => {
    console.timeEnd('copy');
  });
})();
