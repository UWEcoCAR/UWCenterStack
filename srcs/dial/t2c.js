/**
 * Touch-2-Corners algorithm. Determines if a 
 * finger or mouse moving across the screen is
 * a Touch-2-Corners event based on several criteria including,
 * total movement time, directedness, and where the movement ends.
 * 
 * Depends on: common.js
 */

// ELEMENTS

var debug; 		// paragraph element to print debug info

// VARIABLES

var width,		// dimensions of window
	height;

var drag;

// CONSTANTS

var NORMAL_SIZE = 200;	// normal radius of the corner element in pixels
var SENSITIVITY = 200;	// pixels from edge of outer corner to start scaling up
var MAX_SIZE = 300;		// maximum radius of corner, when pointer is at extreme corner
var MAX_TIME = 1000; 	// maximum time a valid swipe can take
var DIRECTNESS = 1.2;	// maximum ration of distance/displacement for a valid swipe
						// DO NOT GO BELOW 1
var SHRINK_PPF = 20;	// pixels per frame that the corners shrink at

/**
 * Called when window is initially loaded.
 * 
 * Adds all necessary event listeners for touch and mouse control,
 * retrieves necessary element doms from html file,
 * gets window height and width,
 * and sets size and margin of each corner element.
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
	
	UIList = new UIElementList(dialCanvas);

	// sets up dial
	dialCanvas.width = width;
	dialCanvas.height = height;
	dial = new Dial(dialCanvas, 500, new Position(width/2 + 250, height/2));
	dial2 = new Dial(dialCanvas, 350, new Position(width/2 - 200, height/2 + 175));
	dial3 = new Dial(dialCanvas, 350, new Position(width/2 - 200, height/2 - 175));

	// makes a button
	button1 = new Button(dialCanvas, 150, new Position(width/2-50, height/2), "Press");

	//make a guide
	// guide1 = new Guide(dialCanvas, 300);

	// make corners
	tl = new Corner(dialCanvas, NORMAL_SIZE, SENSITIVITY, MAX_SIZE, new Position(0,0));
	tr = new Corner(dialCanvas, NORMAL_SIZE, SENSITIVITY, MAX_SIZE, new Position(width, 0));
	bl = new Corner(dialCanvas, NORMAL_SIZE, SENSITIVITY, MAX_SIZE, new Position(0, height));
	br = new Corner(dialCanvas, NORMAL_SIZE, SENSITIVITY, MAX_SIZE, new Position(width, height));

	UIList.add(dial);
	UIList.add(dial2);
	UIList.add(dial3);
	UIList.add(button1);
	// UIList.add(guide1);
	UIList.add(tl);
	UIList.add(tr);
	UIList.add(bl);
	UIList.add(br);
	UIList.draw();

	// set framerate
	window.requestAnimFrame = window.webkitRequestAnimationFrame; // Caps animation to 60 FPS
}

function reset() {
	if (UIList.needsUpdate()){
		UIList.update();
		requestAnimFrame(reset);
	}
}

/**
 * Starts a new drag
 * Should be called any time the mouse is down or a touch starts.
 * 
 * @param {Position} position The current position of the drag.
 */
function onStart(position) {
	drag = new Drag(position);
	UIList.onStart(position);
	debug.css("background", "blue");
	debug.html("started");
}

/**
 * Advances the drag and updates the corner sizes.
 * Should be called any time the mouse or finger moves during a drag.
 * 
 * @param {Position} position The current position of the drag.
 */
function onMove(position) {
	UIList.onMove(position);
	drag.isScroll = false;
	drag.inProgress = true;
	drag.addPosition(position);
}

/**
 * Ends the drag, updates the corner sizes, and determines if the drag was a
 * Touch-2-Corner.
 * Should be called when the user relases the mouse or removes their finger.
 */
function onEnd() {
	drag.end();
	UIList.onEnd();

	debug.html("Time = " + drag.duration + 
	"<br />Distance = " + drag.distance + 
	"<br />Displacement = " + drag.displacement + 
	"<br />Distance/Displacement = " + drag.distance / drag.displacement);
	reset();
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
	debug.html(e.targetTouches.length);
	if (e.targetTouches.length == 1){
		onMove(new Position(e.targetTouches[0].pageX, e.targetTouches[0].pageY));
	}
}

/**
 * @see onEnd()
 */
function onTouchEnd(e) {
	onEnd();
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
	if (drag && drag.inProgress){
		onMove(new Position(e.pageX, e.pageY));
	}
}

/**
 * @see onEnd()
 */
function onMouseUp(e) {
	onEnd();
}