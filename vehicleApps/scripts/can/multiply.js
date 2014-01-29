var ffi = require('ffi');

// binding to multiply function
var cLibrary = ffi.Library('./scripts/can/multiply', {
  'multiply': [ 'int', [ 'int', 'int' ] ]
});

// now use them:
var product = cLibrary.multiply(10, 20);
console.log(product);