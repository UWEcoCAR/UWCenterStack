// Get our modules
var ffi = require('ffi');
var express = require('express');
var url = require('url');

var ref = require('ref');
var ArrayType = require('ref-array');
var StructType = require('ref-struct');

// Define constants
HS_CHANNEL = 0;
LS_CHANNEL = 1;

// Define the message parameters
var long = ref.types.long;
var int = ref.types.int;
var byte = ref.types.byte;
var ByteArray = ArrayType(byte);

// Define the "Message" struct type
var Message = StructType({
  channel: int,
  id: long,
  length: int,
  data: ByteArray
});
var MessagePntr = ref.refType(Message);

// Initialize canInterface library 
var canInterface = ffi.Library('./scripts/can/libcanlib', {
  'freeMessage': ['void', [MessagePntr]],
  'initialize': [int, []],
  'newMessage': [MessagePntr, [ int, long, int, ByteArray]],
  'writeMessage': ['void', [MessagePntr]],
  'readMessage': ['void', [MessagePntr]]
});


// Set index.html
var app = express();
app.get('/', function(req, res){
  res.sendfile('html/canTest.html');
});

// Set fan speed test
app.get('/test', function(req, res) {

  // Initialize can interface
  if (canInterface.initialize() == 0) {
    console.log('Initialize failed!!!');
    res.send('Initialize failed!!!', 500);
    return;
  }

  // Send diagnostic message
  var diagMessagePntr = canInterface.newMessage(LS_CHANNEL, 257, 8, new ByteArray([7, 254, 1, 62, 0, 0, 0, 0]));
  canInterface.writeMessage(diagMessagePntr);
  canInterface.freeMessage(diagMessagePntr);

  // Send fan speed message
  var fanMessagePntr = canInterface.newMessage(LS_CHANNEL, 593, 8, new ByteArray([7, 174, 2, 8, 0, 0, 0, parseInt(req.query.value)]));
  canInterface.writeMessage(fanMessagePntr);
  canInterface.freeMessage(fanMessagePntr);
  
  res.send("Fan is running at speed: " + parseInt(req.query.value));
});

// Start listening for requests
app.listen(8080);
console.log('Listening on port: 8080');
