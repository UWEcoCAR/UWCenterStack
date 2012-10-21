/**
 * Touch-2-Corners algorithm. Determines if a 
 * finger or mouse moving across the screen is
 * a Touch-2-Corners event based on several criteria including,
 * total movement time, directedness, and where the movement ends.
 * 
 * Depends on: common.js
 */

// ELEMENTS

// Corner image elements
var tl, //top left
	tr, //top right
	bl, //bottom left
	br; //bottom right

var debug; 		// paragraph element to print debug info

var corners; 	// corner images

// VARIABLES

var width,		// dimensions of window
	height;

var drag;

// CONSTANTS

var NORMAL_SIZE = 100;	// normal radius of the corner element in pixels
var SENSITIVITY = 200;	// pixels from edge of outer corner to start scaling up
var MAX_SIZE = 200;		// maximum radius of corner, when pointer is at extreme corner
var MAX_TIME = 1000; 	// maximum time a valid swipe can take
var DIRECTNESS = 1.2;	// maximum ration of distance/displacement for a valid swipe
						// DO NOT GO BELOW 1

/**
 * @class Represents a mouse or finger dragging across the screen.
 * Contains time, distance, and displacement information about the drag.
 * 
 * @param {Position} The starting position of the drag.
 */
function Drag(startingPosition) {
	this.startTime = currentTime();		// the start time (in milliseconds) of the Drag
	this.duration = 0;					// the elapsed time (in milliseconds) of the Drag
	this.distance = 0;					// distance traveled over entire Drag
	this.displacement = 0;				// distance between the beginning and end of the Drag
	this.inProgress = true;				// true if Drag is still in progress
	this.currentPos = startingPosition;	// The last know position of the Drag
	this.startPos = startingPosition;	// The position where the Drag started
	
	/**
	 * Adds the given position to the Drag. 
	 * Should be called when the user moves the mouse or their finger.
	 */
	this.addPosition = function(position) {
		this.distance += this.currentPos.distanceFrom(position);
		this.displacement = this.startPos.distanceFrom(position);
		this.currentPos = position;
		this.duration = timeFrom(this.startTime);
	}
	
	/**
	 * Ends the Drag.
	 * Should be called when the user releases the mouse or removes their finger.
	 */
	this.end = function() {
		this.inProgress = false;
		this.duration = timeFrom(this.startTime);
	}
}

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
	
	// Get DOM elements
	debug = $("#coord");
	tl = $("#tl");
	tr = $("#tr");
	bl = $("#bl");
	br = $("#br"); 
	corners = $(".corner");
	
	// Get window dimensions
	width = window.innerWidth;
	height = window.innerHeight;
	
	// Set corner positions
	tl.center = new Position(0, 0);
	tr.center = new Position(width, 0);
	bl.center = new Position(0, height);
	br.center = new Position(width, height);
	
	// Initialize corners
	corners.css("-webkit-transition", "width 0s, height 0s, margin 0s");
	corners.width(NORMAL_SIZE*2);
	corners.height(NORMAL_SIZE*2);
	corners.css("margin", -NORMAL_SIZE + "px");
}

/**
 * Starts a new drag
 * Should be called any time the mouse is down or a touch starts.
 * 
 * @param {Position} position The current position of the drag.
 */
function onStart(position) {
	drag = new Drag(position);
	debug.css("background", "blue");
	debug.html("started");
	corners.css("-webkit-transition", "width 0s, height 0s, margin 0s");
}

/**
 * Advances the drag and updates the corner sizes.
 * Should be called any time the mouse or finger moves during a drag.
 * 
 * @param {Position} position The current position of the drag.
 */
function onMove(position) {
	drag.addPosition(position);
	
	debug.html("(" + drag.currentPos.x + "/" + width +", " + drag.currentPos.y + "/" + height +")");
	
	var cornersArray = getCornersArray();
	for (var i = 0; i < cornersArray.length; i++) {
		drawCorner(position.distanceFrom(cornersArray[i].center), cornersArray[i]);
	}
}

/**
 * Ends the drag, updates the corner sizes, and determines if the drag was a
 * Touch-2-Corner.
 * Should be called when the user relases the mouse or removes their finger.
 */
function onEnd() {
	drag.end();
	
	debug.html("Time = " + drag.duration + 
	"<br />Distance = " + drag.distance + 
	"<br />Displacement = " + drag.displacement + 
	"<br />Distance/Displacement = " + drag.distance / drag.displacement);
	
	if(isT2c()){
		debug.css("background", "green");
		// var corner = isT2c();
	} else {
		debug.css("background", "red");
	}
	
	corners.css("-webkit-transition", "width .6s, height .6s, margin .6s");
	corners.width(NORMAL_SIZE*2);
	corners.height(NORMAL_SIZE*2);
	corners.css("margin", -NORMAL_SIZE + "px");
}

/**
 * Determines if the drag was a Touch-2-Corner (t2c).
 * 
 * @returns {Element|Boolean} If the drag was a t2c, then the corner element, otherwise false.
 */
function isT2c() {
	if (drag.duration <= MAX_TIME && drag.displacement*DIRECTNESS > drag.distance) {
		var cornersArray = getCornersArray();
		for (var i = 0; i < cornersArray.length; i++) {
			if (drag.currentPos.distanceFrom(cornersArray[i].center) < sizeEquation(drag.currentPos.distanceFrom(cornersArray[i].center))/2) {
				return cornersArray[i];
			}
		}
	}
	return false;
}

/**
 * Sets the size and margin for a corner.
 * 
 * @param {Number} distance Distance from pointer event to corner.
 * @param {Element} corner Corner element to draw.
 */
function drawCorner(distance, corner) {
	var size = sizeEquation(distance);
	corner.width(size); 
	corner.height(size);
	corner.css("margin", -size/2 +"px");
}

/**
 * THE MAGIC SIZE EQUATION
 * 
 * @param {Number} distance Distance from corner.
 * @returns {Number} Ideal size of corner.
 */
function sizeEquation(distance){
	return Math.max(NORMAL_SIZE*2+SENSITIVITY-distance, 0)/(NORMAL_SIZE*2+SENSITIVITY)*(MAX_SIZE*2-NORMAL_SIZE*2) + NORMAL_SIZE*2;
}

/**
 * @see onStart(position)
 */
function onTouchStart(e) {
	onStart(new Position(e.targetTouches[0].pageX, e.targetTouches[0].pageY));
	
}

/**
 * @see onMove(position)
 */
function onTouchMove(e) {
	if (e.targetTouches.length == 1){
		e.preventDefault();
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

/**
 * @returns {Array} The corner elements as an Array.
 */
function getCornersArray() {
	return [tl, tr, bl, br];
}