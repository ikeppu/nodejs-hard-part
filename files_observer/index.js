const fs = require('fs/promises');

// open the file (32) file descriptor
// read or write
(async () => {
  // () Limit scope

  const fileHandle = await fs.open('./command.txt', 'r');
  const watcher = fs.watch('./command.txt');

  for await (const event of watcher) {
    if (event.eventType === 'change') {
      // we want to read the content

      // get the size of our file
      const fileLength = await fileHandle.stat();
      console.log('fileLength ---->', fileLength);
      const buff = Buffer.alloc(fileLength.size);
      const offset = 0;
      const position = 0;
      const length = fileLength.size;

      const content = await fileHandle.read(buff, offset, length, position);
      console.log('Content ---->', buff.toString());

      // decoder = 01 => meaningfull
      // encoder meaningfull => 01
    }
  }
})();
