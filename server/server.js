'use strict';

// Vinicio - Our friend, curried functions, makes a comeback
const socketIO = require('socket.io')(3000);

const SPEAK_EVENT = 'speak';
const RECEIVED_EVENT = 'received';
const FILE_SAVED_EVENT = 'file_saved';

socketIO.on('connection', socket => {
  console.log('New socket connected :)',socket.id);

  socket.on(SPEAK_EVENT, message => {
    console.log({message});
    socket.broadcast.emit(RECEIVED_EVENT,{id: socket.id, message});
  });
  socket.on(FILE_SAVED_EVENT, () => {
    console.log('server heard file save');
    socket.broadcast.emit('success');
  });
  socket.on('unable to transform', (payload) => {
    // console.log('Server heard failure', payload);
    socket.broadcast.emit('failure', payload);
  });
});