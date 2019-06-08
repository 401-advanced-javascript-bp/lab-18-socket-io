'use strict';

const socketIOClient = require('socket.io-client');

const constants = require('../utils/constants');
const events = require('../utils/events');

const socket = socketIOClient.connect(constants.SERVER_URL);

//Vinicio - Logger is receiving everything in the general message area
socket.on(events.RECEIVED_EVENT, payload => {
  console.log(payload);
});

socket.on('test', () => {
  console.log('This is a test from the logger.');
});

socket.on('success', () => {
  console.log('logger heard success');
});
//Becky - payload can be anything
socket.on('failure', (jjjj) => {
  console.log('Was not able to modify file', jjjj);
});



