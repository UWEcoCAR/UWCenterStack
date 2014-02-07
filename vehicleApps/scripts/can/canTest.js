//install necessary components
var ffi = require('ffi');
var express = require('express');
var url = require('url');

var ref = require('ref');
var ArrayType = require('ref-array');
var StructType = require('ref-struct');

// define the message parameters
var long = ref.types.long;
var int = ref.types.int;
var byte = ref.types.byte;
var byteArray = ArrayType(byte);
//var charArray = ArrayType(char)

// define the "canMsg" struct type
var msg = StructType({
  channel: int,
  id: long,
  length: int,
  data: byteArray
});

var msgPntr = ref.refType(msg);

// now we can create instances of it
var ourMsg = new msg();

//testing our struct
ourMsg.id = 64;
//console.log(msgPntr.deref().id)



var app = express();
app.get('/', function(req, res){
	console.log('html/canTest.html');
  res.sendfile('html/canTest.html');
});


var cLibrary = ffi.Library('./scripts/can/libcanlib', {
  'freeMessage': ['void', [msgPntr]],
  'initialize': ['void',[]],
  'newMessage': [msgPntr, [ int, long, int, byteArray]],
  'writeMessage': ['void', [msgPntr]],
  'readMessage': ['void', [msgPntr]]
});


/*var testArray = new charArray([1,2,3,4,5,6,7])

var msgPntrTest = cLibrary.newMessage(7,3,4,testArray)
console.log(msgPntrTest.deref().data[6])
cLibrary.initialize()
cLibrary.writeMessage(msgPntrTest)
cLibrary.freeMessage(msgPntrTest)
*/

//cLibrary.initialize();
app.get('/test', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain' });
  
  cLibrary.initialize();
  var diagArray = new byteArray(8);
  diagArray[0] = 7;
  diagArray[1] = 254;
  diagArray[2] = 1;
  diagArray[3] = 62;
  diagArray[4] = 0;
  diagArray[5] = 0;
  diagArray[6] = 0;
  diagArray[7] = 0;

  var diagMsgPntr = cLibrary.newMessage(1,257,8, diagArray);
  cLibrary.writeMessage(diagMsgPntr);

  var fanArray = new byteArray(8);
  fanArray[0] = 7;
  fanArray[1] = 174;
  fanArray[2] = 2;
  fanArray[3] = 8;
  fanArray[4] = 0;
  fanArray[5] = 0;
  fanArray[6] = 0;
  fanArray[7] = parseInt(req.query.value);

  var fanMsgPntr = cLibrary.newMessage(1,593,8, fanArray);
  cLibrary.writeMessage(fanMsgPntr);

  cLibrary.freeMessage(diagMsgPntr);
  cLibrary.freeMessage(fanMsgPntr);
/*
 var message = new Array();
  message[0] = 7;
  message[1] = 174;
  message[2] = 1;
  message[3] = 62;
  message[4] = 0;
  message[5] = 0;
  message[6] = 0;
  message[7] = 0;
  //var prod = cLibrary.sendMessage(1, 593, 8, message);
 */ res.end("Fan is running at speed: " + parseInt(req.query.value));

});

console.log(app.routes);
app.listen(8080);



