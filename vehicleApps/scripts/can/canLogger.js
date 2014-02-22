var fs = require('fs');
var NanoTimer = require('nanotimer');
var moment = require('moment');
var FileWatcher = require('../utils/FileWatcher.js');

var CAN_LOGS_DRIVE = '/media/uw-center-stack/CAN LOGS';

var start;
var timer = new NanoTimer();

// Watch for the can logs drive to be added
new FileWatcher(CAN_LOGS_DRIVE)
	.on('connected', function(filepath) {
		console.log('Connected: ' + filepath);

		// Wait a few seconds for the external drive 
		// to be fully initialized before created log file
		timer.setTimeout(function() {
			start = moment();
			
			// Create file and output stream
			var out = createFile();

			printHeader(out);

			// Print data every second
			timer.setInterval(printData, [out], '1s');
		}, '', '1s');
	})
	.on('disconnected', function(filepath) {
		console.log('Disonnected: ' + filepath);

		// Stop timer
		timer.clearInterval();
	});

/*
 * Create a new file on the can logs drive with a time stamped name
 * Returns the write stream
 */
function createFile() {
	return fs.createWriteStream(CAN_LOGS_DRIVE + '/' + start.format('MM-DD-YY HH_mm_ss') + '.txt');	
}

/*
 * Prints the tab delminated header row
 */
function printHeader(writeStream) {
	writeStream.write('Time (s)\t\n');
}

/*
 * Prints a tab delminated data row of the most up to date data
 */
function printData(writeStream) {
	var time = moment().diff(start, 'seconds');
	writeStream.write(time + '\t');
	writeStream.write('\n');
}
