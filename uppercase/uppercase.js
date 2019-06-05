'use strict';

//Becky - this file listens for events
const eventEmitter = require('./event-emitter');
const eventNames = require('./event-names');
const reader = require('./read.js');
const util = require('util');
const fs = require('fs');

//keep
const handleUpperCase = (fileContents) => {
  const upperCaseString = fileContents.toString().toUpperCase();
  // build new payload
  eventEmitter.emit(eventNames.WRITE, upperCaseString);
}

eventEmitter.on(eventNames.UPPERCASE, handleUpperCase);

module.exports = { handleUpperCase };