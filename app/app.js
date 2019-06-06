'use strict';
//this is same as client
const fs = require('fs');
const socketIOClient = require('socket.io-client');

const faker = require('faker');

const constants = require('../utils/constants');
const events = require('../utils/events');
// const transform = require('../utils/events');

const appSocket = socketIOClient.connect(constants.SERVER_URL);

// Becky - this represents the name of the text file with data to be modified
let file = process.argv.slice(2).shift();
//Becky we pass the above file variable as data (instead of a function) as the second parameter for the emit method
//this is the first emit to fire the chain of events for the read, uppercase, write chain of functions
appSocket.emit(events.READ_EVENT, file);


// setInterval(() => {
//   appSocket.emit(events.SPEAK_EVENT, faker.hacker.phrase());
//   // homeSocket.emit(events.SPEAK_EVENT, 'Clean your room! >_<');
//   // schoolSocket.emit(events.CODE_CHALLENGE_EVENT, null);
// }, constants.TIMEOUT_BETWEEN_MESSAGES);

//starter code//
// const alterFile = (file) => {
//   fs.readFile( file, (err, data) => {
//     if(err) { throw err; }
//     let text = data.toString().toUpperCase();
//     fs.writeFile( file, Buffer.from(text), (err, data) => {
//       if(err) { throw err; }
//       console.log(`${file} saved`);
//     });
//   });
// };

// alterFile(file);
