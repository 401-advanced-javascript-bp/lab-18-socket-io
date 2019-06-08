'use strict';
const socketIOClient = require('socket.io-client');
const constants = require('../utils/constants');
const events = require('../utils/events');
//this is where transform.js is connected to server.js
const appSocket = socketIOClient.connect(constants.SERVER_URL);
const util = require('util');
const fs = require('fs');
const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

//Becky - this listens for the read event emitted in the app.js file
const transformFile = (fileName) => {
  read(fileName)
    //.then always takes a function as a parameter
    //this is an example of a promise chain
    .then((fileContents) => {
      return new Buffer(fileContents.toString().toUpperCase());
    })
    //passing the results from line 18
    .then((upperCaseBuffer) => {
      return write(fileName, upperCaseBuffer);
    })
    .then(() => {
      console.log(`${fileName} saved`);
      // clientQ.publish('files', 'save', 'This file was modified and saved.');
    })
    .catch((err) => {
      console.error(err);
    });
};
// appSocket.on(events.READ_EVENT, transformFile);
// const handleUpperCase = (fileContents) => {
//   const upperCaseString = fileContents.toString().toUpperCase();
//   // build new payload
//   appSocket.emit(events.WRITE_EVENT, upperCaseString);
// };
// // appSocket.on(events.UPPERCASE_EVENT, handleUpperCase);
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

module.exports = { transformFile };
