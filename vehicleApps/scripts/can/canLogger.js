var fs = require('fs');
var moment = require('moment');
var _ = require('underscore');

start = moment();
var out = fs.createWriteStream(__dirname + '/tmp/test.txt', {flags: 'w+'});
setInterval(function(){
	_.defer(function() {
		moment().diff(start)/1000;
		moment().diff(start)/1000;
		moment().diff(start)/1000;
		moment().diff(start)/1000;
		moment().diff(start)/1000;
		moment().diff(start)/1000;
		moment().diff(start)/1000;
		moment().diff(start)/1000;
		moment().diff(start)/1000;
		moment().diff(start)/1000;
		moment().diff(start)/1000;
		moment().diff(start)/1000;
		moment().diff(start)/1000;
		moment().diff(start)/1000;
		moment().diff(start)/1000;
		moment().diff(start)/1000;
		moment().diff(start)/1000;
		for (var i = 0; i < 100; i++) {
			console.log('test');
		}
		var diff = moment().diff(start);
		var i = Math.round(diff/1000);
		out.write(i + ' ');
		out.write(Math.round((diff/1000 - i)/i*1000) + ' ');
		out.write(diff/1000 + '\n');	
	})

},1000);