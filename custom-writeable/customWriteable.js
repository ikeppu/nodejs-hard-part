const { Writable } = require('node:stream');
const fs = require('node:fs');

class FileWriteStream extends Writable {
  constructor({ highWaterMark, filename }) {
    super({ highWaterMark });

    this.filename = filename;
    this.fs = undefined;
    this.chunks = [];
    this.chunksSize = 0;
    this.writesCounts = 0;
  }
  // This will run after the constructor and it will put off all calling the other methods
  // until we call the cb fn
  _construct(cb) {
    fs.open(this.filename, 'w', (err, fd) => {
      if (err) {
        // so if we call the cb with argument, it means that we have an error
        // and we should not proceed
        cb(err);
      } else {
        this.fd = fd;
        // no argument means it was susseccfully
        cb();
      }
    });
  }

  _write(chunk, encoding, cb) {
    // do our write operation
    this.chunks.push(chunk);
    this.chunksSize += chunk.length;

    if (this.chunksSize > this.writableHighWaterMark) {
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
        if (err) {
          return cb(err);
        }
        this.chunks = [];
        this.chunksSize = 0;
        ++this.writesCounts;
        cb();
      });
    } else {
      cb();
    }
  }

  _final(cb) {
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) {
        return cb(err);
      }
      this.chunks = [];
      cb();
    });
  }

  _destroy(error, cb) {
    console.log('Number of writes: ', this.writesCounts);
    if (this.fd) {
      fs.close(this.fd, (err) => {
        cb(err || error);
      });
    } else {
      cb(error);
    }
  }
}

const stream = new FileWriteStream({
  highWaterMark: 1800,
  filename: './text.txt',
});

stream.write(Buffer.from('this is some string'));

stream.end(Buffer.from('Our last write'));

stream.on('drain', () => {
  console.log('Drained');
});
