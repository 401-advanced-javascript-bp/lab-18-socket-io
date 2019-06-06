'use strict';
const socketIOClient = require('socket.io-client');
const constants = require('../utils/constants');
const events = require('../utils/events');
const appSocket = socketIOClient.connect(constants.SERVER_URL);
const util = require('util');
const fs = require('fs');

//Becky - this listens for the read event emitted in the app.js file
const handleRead = (fileName) => {
  console.log('handleRead');
  const read = util.promisify(fs.readFile);
  read(fileName).then((fileContents) => {
    appSocket.emit(events.UPPERCASE_EVENT, fileContents);
  }).catch((error) => {
    console.log(error);
  });
};
appSocket.on(events.READ_EVENT, handleRead);
// const handleUpperCase = (fileContents) => {
//   const upperCaseString = fileContents.toString().toUpperCase();
//   // build new payload
//   appSocket.emit(events.WRITE_EVENT, upperCaseString);
// };
// appSocket.on(events.UPPERCASE_EVENT, handleUpperCase);
// const handleWrite = (upperCaseString) => {
//   //validate inpute (please validate if you can)
//   const write = util.promisify(fs.writeFile);
//   //hardcode
//   write('./readthis.txt', Buffer.from(upperCaseString)).then((write) => { //need to verify
//     appSocket.emit(events.LOG_EVENT, consoleThis);
//   }).catch((error) => {
//     console.log(error);
//   });
// };

// appSocket.on(events.WRITE_EVENT, handleWrite);

module.exports = { handleRead };
