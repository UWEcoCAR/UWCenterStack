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
	// Get window dimensions
	width = window.innerWidth;
	height = window.innerHeight;
	
	// Get DOM elements
	debug = $("#coord");
	parent = document.getElementById("parent");
		parent.style.height = height + "px";
		parent.style.width = width + "px";
		parent.style.overflow = "hidden";

	// Add touch handlers
	parent.addEventListener("touchstart", onTouchStart, false);
	parent.addEventListener("touchmove", onTouchMove, false);
	parent.addEventListener("touchend", onTouchEnd, false);
	parent.addEventListener("touchleave", onTouchEnd, false);
	parent.addEventListener("touchcancel", onTouchEnd, false);
	
	// Add mouse handlers
	// NONE OF THESE ARE NEEDED FOR TOUCHSCREEN
	parent.addEventListener("mousedown", onMouseDown, false);
	parent.addEventListener("mouseup", onMouseUp, false);
	parent.addEventListener("mousemove", onMouseMove, false);
	
	UIList = new UIElementList(parent);

// CREATE ALL UI ELEMENTS
	// create dials
	dial = new Dial("bigDial", 'dial.png', 400, new Position(512, 365));
	UIList.add(dial);

	//create corners
	var bl = new Corner("bl", 'circle.png', new Position(0,height));
	var br = new Corner("br", 'circle.png', new Position(width,height));

	UIList.add(bl);
	UIList.add(br);

	var callback = new function() {
		if(parent.style.backgroundImage == "none") {
			parent.style.backgroundImage = "url(bg.jpeg)";
		} else {
			parent.style.backgroundImage = "none";
		}
	}

	// create buttons
	var l = new Button("l", 'buttonUp.png', 'buttonDown.png', 75, new Position(width/2 - 75, 365), callback);
	var m = new Button("m", 'buttonUp.png', 'buttonDown.png', 100, new Position(width/2, 365), callback);
	var r = new Button("r", 'buttonUp.png', 'buttonDown.png', 75, new Position(width/2 + 75, 365), callback);

	UIList.add(l);
	UIList.add(m);
	UIList.add(r);

	// create sliders
	rSlider = new Slider("rSlider", "buttonUp.png", 110, new Position(512, 365), 330, Math.PI/4 *.75, false, true);
	lSlider = new Slider("rSlider", "buttonUp.png", 110, new Position(512, 365), 330, Math.PI/4 * .75, ["Artist", "Album", "Song", "Genre", "Playlist"], false);
	
	UIList.add(rSlider);
	UIList.add(lSlider);

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
	var time = currentTime();
	drag = new Drag(position);
	UIList.onStart(position);
	debug.css("background", "blue");
	debug.html("started");
	// console.log("Start: " + timeFrom(time));
}

/**
 * Alerts UIElementList of the current status of the pointer event.
 * Should be called any time the mouse or finger moves during a drag.
 * 
 * @param {Position} position The current position of the pointer.
 */
function onMove(position) {
	var time = currentTime();
	if (drag && drag.inProgress){
		drag.addPosition(position);
		var endResult = UIList.onMove(position);
	}
	// console.log("Move: " + timeFrom(time));
}

/**
 * Alerts UIElementList that the pointer event has ended
 * Should be called when the user relases the mouse or removes their finger.
 * @param {Position} position The current position of the pointer.
 */
function onEnd() {
	var time = currentTime();
	if (drag.inProgress) {
		drag.end();
		mouseDown = false;
		var endResult = UIList.onEnd();
		reset();
	}
	// console.log("End: " + timeFrom(time));
}

/**
 * @see onStart(position)
 */
function onTouchStart(e) {
	e.preventDefault();
	if (e.touches.length == 1) {
		touchS = e;
		onStart(new Position(e.touches[0].pageX, e.touches[0].pageY));
	}
	
}

/**
 * @see onMove(position) for one finger
 */
function onTouchMove(e) {
	e.preventDefault();
	touchM = e;
	onMove(new Position(e.touches[0].pageX, e.touches[0].pageY));
}

/**
 * @see onEnd()
 */
function onTouchEnd(e) {
	e.preventDefault();
	touchE = e;
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
		onMove(new Position(e.pageX, e.pageY));
}

/**
 * @see onEnd()
 */
function onMouseUp(e) {
	onEnd();
}