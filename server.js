var ffi = require('ffi');
var express = require('express');

var app = express();
app.get('/', function(req, res){
  res.sendfile(__dirname + '/public/html/index.html');
});
app.use('/static', express.static(__dirname + '/public'));

// binding to multiply function
var cLibrary = ffi.Library('./multiply', {
  'multiply': [ 'int', [ 'int', 'int' ] ]
});

// now use them:
var product = cLibrary.multiply(10, 20);
console.log(product);

app.listen(8080);