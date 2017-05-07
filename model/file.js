const fs = require('fs');
const Tail = require('tail').Tail;

function File (obj) {
  if (obj && typeof obj === 'object') {
    for (var key in obj) {
      this[key] = obj[key];
    }
  }
}

/**
 * Get file content as utf8
 * @param callback callback
 */
File.prototype.getContent = function (callback) {
  if (this.hasOwnProperty('filepath')) {
    fs.readFile(this.filepath, 'utf8', function (err, data) {
      if (err) throw new Error(err);
      if (callback && typeof callback === 'function') {
        callback(data);
      }
    });
  }
};

/**
 * Init tail on the file. Listen on new line
 * @param socket Socket which send data to the server
 * @returns {*}
 */
File.prototype.initTail= function (socket) {
  var that = this;
  return new Tail(this.filepath)
    .on('line', function (line) {
      socket.emit('file:newLine', {
        _id: that._id,
        content: line
      });
    })
    .on('error', function (err) {
      socket.emit('file:error', {
        _id: that._id,
        err: err
      });
    });
};

module.exports = File;
