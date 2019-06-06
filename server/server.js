'use strict';
const PORT = 3000;
const genericServer = require('socket.io')(PORT);
const events = require('../utils/events.js');

genericServer.on('connection', socket => {
  console.log('(Generic) New socket connected :)', socket.id);
  socket.on(events.SPEAK_EVENT, message => {
    // console.log({message});
    // socket.broadcast.emit(RECEIVED_EVENT, {id: socket.id, message});
    genericServer.emit(events.RECEIVED_EVENT, message);
  });
});

//Modularization//
const homeServer = genericServer.of('/home'); //path?//gives you access to home
homeServer.on('connection', (socket) => { //give me access to specific object
  console.log('(Home) New socket connected :)', socket.id);

  //Here you have the possibility of reacting to events in a different way
  socket.on(events.SPEAK_EVENT, message => {
    //this message goes to everyone
    genericServer.emit(events.RECEIVED_EVENT, message);
  });
});

//////
const schoolServer = genericServer.of('/school');
schoolServer.on('connection', (socket) => {
  console.log('(School) New socket connected :)', socket.id);
  socket.on(events.SPEAK_EVENT, message => {
    //Vinicio - this message is going only to a specific group of people
    schoolServer.emit(events.RECEIVED_EVENT, message);
  });

  socket.on(events.CODE_CHALLENGE_EVENT, payload => {
    //this is a generic school, let's send th code challenge event only to code fellows people
    schoolServer.to(events.CODE_FELLOWS_ROOM).emit(events.CODE_CHALLENGE_EVENT, payload);
  });

  socket.on('join', room => {
    console.log('joined', room);
    socket.join(room);
  });
});

