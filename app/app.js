'use strict';
//this is same as client
// const fs = require('fs');
// const socketIOClient = require('socket.io-client');
// // const faker = require('faker');

// const constants = require('../utils/constants');
// const events = require('../utils/events');
// // const transform = require('../utils/events');

// //app.js is only connected to server.js
// const appSocket = socketIOClient.connect(constants.SERVER_URL);

// // Becky - this represents the name of the text file with data to be modified
let file = process.argv.slice(2).shift();
// //Becky we pass the above file variable as data (instead of a function) as the second parameter for the emit method
// //this is the first emit to fire the chain of events for the read, uppercase, write chain of functions

// //when this emits, only server.js hears this
// appSocket.emit(events.READ_EVENT, file);


// setInterval(() => {
//   appSocket.emit(events.SPEAK_EVENT, faker.hacker.phrase());
//   // homeSocket.emit(events.SPEAK_EVENT, 'Clean your room! >_<');
//   // schoolSocket.emit(events.CODE_CHALLENGE_EVENT, null);
// }, constants.TIMEOUT_BETWEEN_MESSAGES);

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
      return Buffer.from(fileContents.toString().toUpperCase());
    })
    //passing the results from line 18
    .then((upperCaseBuffer) => {
      return write(fileName, upperCaseBuffer);
    })
    .then(() => {
    //   console.log(`${fileName} saved`);
      appSocket.emit('file_saved');
    })
    .catch((err) => {
    //   console.error(err);
      appSocket.emit('unable to transform', err);
    });
};

transformFile(file);
