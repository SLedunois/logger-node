const fs = require('fs');
const configuration = require('./configuration.json');
const store = require('./store');
const File = require('./model/file');
const ip = require('ip').address();
// Utils imports
const storeUtils = require('./utils/store');

var remote = 'http://' + configuration.remote.host + ':' + configuration.remote.port;

const socket = require('socket.io-client')(remote);

// Init the store;
var filePath;
for (var i = 0; i < configuration.files.length; i++) {
  filePath = configuration.files[i].path;
  filePath += filePath.endsWith('/') ? '' : '/';
  filePath += configuration.files[i].filename;
  try {
    fs.accessSync(filePath, fs.R_OK);
    configuration.files[i].filepath = filePath;
    var _file = new File(storeUtils.createReference(configuration.files[i]));
    store.add(_file);
    _file.initTail(socket);
  } catch (e) {
    throw new Error (e);
  }
}

// Listener on the content file
socket.on('file:getContent', function (fileId) {
  var file = store.get(fileId);
  file.getContent(function (content) {
    socket.emit('file:content', {
      _id: file._id,
      content: content
    });
  });
});

socket.on('config:getConfiguration', function () {
  socket.emit('config:configuration', {
    type: 'NODE',
    platformName: configuration.hasOwnProperty('platformName') ? configuration.platformName : ip,
    files: store.getAll()
  });
});

// Emit store to the server
//socket.emit('files', { data: store.getAll() });
