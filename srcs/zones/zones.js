/**
 * Touch-2-Corners algorithm. Determines if a 
 * finger or mouse moving across the screen is
 * a Touch-2-Corners event based on several criteria including,
 * total movement time, directedness, and where the movement ends.
 * 
 * Depends on: common.js, UIElementList.js, UIElements
 */

// ELEMENTS
var debug; 		// paragraph element to print debug info
var dialCanvas;
	var dialCtx;
var cornerCanvas;
	var cornerCanvas;

// VARIABLES
var width,		// dimensions of window
	height;

// OBJECTS
var drag;
var UIList;

// CONSTANTS
var NORMAL_SIZE = 200;	// normal radius of the corner element in pixels
var SENSITIVITY = 200;	// pixels from edge of outer corner to start scaling up
var MAX_SIZE = 300;		// maximum radius of corner, when pointer is at extreme corner
// var MAX_TIME = 1000; 	// maximum time a valid swipe can take
// var DIRECTNESS = 1.2;	// maximum ration of distance/displacement for a valid swipe
						// DO NOT GO BELOW 1
// var SHRINK_PPF = 20;	// pixels per frame that the corners shrink at

/**
 * Called when window is initially loaded.
 * 
 * Adds all necessary event listeners for touch and mouse control,
 * retrieves necessary element doms from html file,
 * gets window height and width,
 * and creates all UI Elements
 */
window.onload = function onLoad() {	
	// Add touch handlers
	document.addEventListener("touchstart", onTouchStart, false);
	document.addEventListener("touchmove", onTouchMove, false);
	document.addEventListener("touchend", onTouchEnd, false);
	
	// Add mouse handlers
	// NONE OF THESE ARE NEEDED FOR TOUCHSCREEN
	document.addEventListener("mousedown", onMouseDown, false);
	document.addEventListener("mouseup", onMouseUp, false);
	document.addEventListener("mousemove", onMouseMove, false);
	
	
	// Get window dimensions
	width = window.innerWidth;
	height = window.innerHeight;
	
	// Get DOM elements
	debug = $("#coord");
	dialCanvas = document.getElementById("dial");
		dialCanvas.width = width;
		dialCanvas.height = height;
	dialCtx = dialCanvas.getContext('2d');

	cornerCanvas = document.getElementById("corners");
		cornerCanvas.width = width;
		cornerCanvas.height = height;
	cornerCtx = cornerCanvas.getContext('2d');
	
	UIList = new UIElementList([dialCtx, cornerCtx]);

// CREATE ALL UI ELEMENTS
	// create dials
	var dialImage = new Image();
	dialImage.onload = function() {
		var dial = new Dial(dialCtx, "bigDial", dialImage, 450, new Position(width/2, height/2));
		UIList.add(dial);
		UIList.draw();
	}
	dialImage.src = 'dial.png';

	zoneManager = new ZoneManager();
		zone1a = new Zone(dialCtx, "zone1a", new Position(width/2 + 168, height/2), 30);
		zone1b = new Zone(dialCtx, "zone1b", new Position(width/2 + 468, height/2), 30);
		zone2a = new Zone(dialCtx, "zone2a", new Position(width/2 + 100, height/2 + 135), 30);
		zone2b = new Zone(dialCtx, "zone2b", new Position(width/2 + 400, height/2 + 135), 30);
		zone3a = new Zone(dialCtx, "zone3a", new Position(width/2 + 100, height/2 - 135), 30);
		zone3b = new Zone(dialCtx, "zone3b", new Position(width/2 + 400, height/2 - 135), 30);

		zoneManager.link(zone1a, zone1b);
		zoneManager.link(zone2a, zone2b);
		zoneManager.link(zone3a, zone3b);
	UIList.add(zoneManager);

	UIList.draw();
	// set framerate
	window.requestAnimFrame = window.webkitRequestAnimationFrame; // Caps animation to 60 FPS
}
/**
 * Called when UI elements need to be transitioned to default
 * Recursively calls as long as one element needs to be updated.
 */
function reset() {
	if (UIList.needsUpdate()){
		UIList.update();
		requestAnimFrame(reset);
	}
}

/**
 * Alerts UIElementList that a pointer event has been started
 * Should be called any time the mouse is down or a touch starts.
 * 
 * @param {Position} position The current position of the pointer
 */
function onStart(position) {
	drag = new Drag(position);
	UIList.onStart(position);
	debug.css("background", "blue");
	debug.html("starting");
}

/**
 * Alerts UIElementList of the current status of the pointer event.
 * Should be called any time the mouse or finger moves during a drag.
 * 
 * @param {Position} position The current position of the pointer.
 */
function onMove(position) {
	if (drag && drag.inProgress){
		drag.addPosition(position);
		var endResult = UIList.onMove(position);
		if (drag.inProgress) {
			var anyResponse = false;
			for(var i = 0; i < endResult.length; i++) {
				anyResponse = anyResponse || endResult[i];
			}
			trace(anyResponse);

			debug.css("background", "yellow");
			debug.html("going");
		}
	}
}

/**
 * Alerts UIElementList that the pointer event has ended
 * Should be called when the user relases the mouse or removes their finger.
 * @param {Position} position The current position of the pointer.
 */
function onEnd(position) {
	if (drag.inProgress) {
		drag.end();
		mouseDown = false;
		var endResult = UIList.onEnd(position);
		
		var anyResponse = false;
		for(var i = 0; i < endResult.length; i++) {
			anyResponse = anyResponse || endResult[i];
		}

		trace(anyResponse);

		if(anyResponse) {
			debug.css("background", "green");
			debug.html("response!");
		} else {
			debug.css("background", "red");
			debug.html("no response");
		}
		
		reset();
	}
}

/**
 * @see onStart(position)
 */
function onTouchStart(e) {
	onStart(new Position(e.targetTouches[0].pageX, e.targetTouches[0].pageY));
	
}

/**
 * @see onMove(position) for one finger
 */
function onTouchMove(e) {
	e.preventDefault();
	onMove(new Position(e.targetTouches[0].pageX, e.targetTouches[0].pageY));
}

/**
 * @see onEnd()
 */
function onTouchEnd(e) {
	onEnd(new Position(e.targetTouches[0].pageX, e.targetTouches[0].pageY));
}

/**
 * @see onStart(position)
 */
function onMouseDown(e) {
	onStart(new Position(e.pageX, e.pageY));
}

/**
 * @see onMove(position)
 */
function onMouseMove(e) {
		onMove(new Position(e.pageX, e.pageY));
}

/**
 * @see onEnd()
 */
function onMouseUp(e) {
	onEnd(new Position(e.pageX, e.pageY));
}

// FOR DEBUGGING PURPOSES
function trace(string) {
	if (false) {
		console.log(string)
	}
}