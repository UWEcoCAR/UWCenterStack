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
var page;

var canvas;
var ctx;

var image;

var corners; 		// corner locations
var defaultCorners	// default corner locations
var cornerSizes; 	// corner sizes

// VARIABLES

var width,		// dimensions of window
	height;

var drag;

// CONSTANTS

var NORMAL_SIZE = 100;	// normal radius of the corner element in pixels
var SENSITIVITY = 200;	// pixels from edge of outer corner to start scaling up
var MAX_SIZE = 150;		// maximum radius of corner, when pointer is at extreme corner
var MAX_TIME = 1000; 	// maximum time a valid swipe can take
var DIRECTNESS = 1.2;	// maximum ration of distance/displacement for a valid swipe
						// DO NOT GO BELOW 1
var SHRINK_PPF = 20;	// pixels per frame that the corners shrink at
var TRANSLATE_PPF = 30; // pixels per frame that the corners return to the corner at

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
	this.isScroll = false;				// true if two fingers are down
	this.currentPos = startingPosition;	// The last know position of the Drag
	this.startPos = startingPosition;	// The position where the Drag started
	this.startedInCorner = findCorner(this.startPos);
	
	function findCorner(position) {
		for (var i = 0; i < corners.length; i++){
			if (corners[i].distanceFrom(startingPosition) <= NORMAL_SIZE) {
				return corners[i];
			}
		}
		return false;
	}

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
		this.isDrag = false;
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
	page = $("#page");
	
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
	canvas = document.getElementById("canvas");
	corners = [new Position(0,0), new Position(width, 0), new Position(0, height), new Position(width, height)]
	defaultCorners = [new Position(0,0), new Position(width, 0), new Position(0, height), new Position(width, height)]
	cornerSizes = [NORMAL_SIZE, NORMAL_SIZE, NORMAL_SIZE, NORMAL_SIZE];
	
	// sets up canvas
	window.requestAnimFrame = window.webkitRequestAnimationFrame; // Caps animation to 60 FPS
	canvas.width = width;
	canvas.height = height;
	ctx = canvas.getContext('2d');
	cornerImage = new Image();
	cornerImage.src = 'circle.png';
	
	// draws the corners initially
	$.each(cornerSizes, function(i, size) {
			size = size*2;
			ctx.drawImage(cornerImage, corners[i].x-size/2, corners[i].y-size/2, size, size);
		});
}

/**
 * Smoothly transitions the corners back to NORMAL_SIZE
 * 
 * Checks to see if any animation is needed, if none then it terminates
 * Shrinks all corners that needs scaling by SHRINK_SPEED
 * Redraws all corners
 * Recursive call
 */
function resetCorners() {
	var needsScaling = false;	// boolean flag to see if animation is needed
	var needsTranslation = false;
	
	// checks each corner to see if it is the right size yet
	for (var i = 0; i < cornerSizes.length; i++){
		needsScaling = needsScaling || cornerSizes[i] != NORMAL_SIZE*2;
	}

	// checks each corner to see if it is at the right location
	for (var i = 0; i < corners.length; i++){
		needsTranslation = needsTranslation || !corners[i].isEqual(defaultCorners[i]);
	}
	
	if (!drag.inProgress && (needsScaling || needsTranslation)){
		ctx.clearRect(0,0,width,height); // clear canvas

		// translate each corner if necessary
		$.each(corners, function(i, position) {
			if (!position.isEqual(defaultCorners[i])) {
				// if (position.x > defaultCorners[i].x){
				// 	position.x = Math.max(position.x - Math.sin(Math.atan(corners[i].x/corners[i].y))*TRANSLATE_PPF, defaultCorners[i].x);
				// }
				// if (position.x < defaultCorners[i].x){
				// 	position.x = Math.min(position.x + Math.sin(Math.atan(corners[i].x/corners[i].y))*TRANSLATE_PPF, defaultCorners[i].x);
				// }
				// if (position.y > defaultCorners[i].y){
				// 	position.y = Math.max(position.y - Math.cos(Math.atan(corners[i].x/corners[i].y))*TRANSLATE_PPF, defaultCorners[i].y);
				// }
				// if (position.y < defaultCorners[i].y){
				// 	position.y = Math.min(position.y + Math.cos(Math.atan(corners[i].x/corners[i].y))*TRANSLATE_PPF, defaultCorners[i].y);
				// }

				if (position.x < defaultCorners[i].x){
					position.x = Math.min(position.x + TRANSLATE_PPF, defaultCorners[i].x);
				} else {
					position.x = Math.max(position.x - TRANSLATE_PPF, defaultCorners[i].x);
				}
				if (position.y < defaultCorners[i].y){
					position.y = Math.min(position.y + TRANSLATE_PPF, defaultCorners[i].y);
				} else {
					position.y = Math.max(position.y - TRANSLATE_PPF, defaultCorners[i].y);
				}
			}
		});

		// shrink each corner if necessary
		$.each(cornerSizes, function(i, size) {
			if (size != NORMAL_SIZE*2) {
				size = Math.max(size-SHRINK_PPF, NORMAL_SIZE*2);
				cornerSizes[i] = size;
			}

			// finally draw
			ctx.drawImage(cornerImage, corners[i].x-size/2, corners[i].y-size/2, size, size);
		});
		
		// call again
		requestAnimFrame(resetCorners);
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
	drag.isScroll = false;
	drag.inProgress = true;
	drag.addPosition(position);
	
//	debug.html("(" + drag.currentPos.x + "/" + width +", " + drag.currentPos.y + "/" + height +")");
	
	ctx.clearRect(0,0,width,height);
	for (var i = 0; i < corners.length; i++) {
		if (drag.startedInCorner){
			if (drag.startedInCorner.isEqual(corners[i])){
				corners[i] = drag.startedInCorner = drag.currentPos;
			}
			drawCorner(Number.MAX_VALUE, i);
		} else {
			drawCorner(position.distanceFrom(corners[i]), i);
		}
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
	} else if (isT2Center()){
		debug.css("background", "#00FFAA");
	} else {
		debug.css("background", "red");
	}
	resetCorners();
}

/**
 * Determines if the drag was a Touch-2-Corner (t2c).
 * 
 * @returns {Element|Boolean} If the drag was a t2c, then the corner element, otherwise false.
 */
function isT2c() {
	if (!drag.startedInCorner && drag.duration <= MAX_TIME && drag.displacement*DIRECTNESS > drag.distance) {
		for (var i = 0; i < corners.length; i++) {
			if (drag.currentPos.distanceFrom(corners[i]) < sizeEquation(drag.currentPos.distanceFrom(corners[i]))/2) {
				return corners[i];
			}
		}
	}
	return false;
}

function isT2Center() {
	if (drag.startedInCorner){
		if (drag.startedInCorner.distanceFrom(new Position(width/2, height/2)) <= 100){
			return drag.startedInCorner;
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
function drawCorner(distance, index) {
	cornerSizes[index] = sizeEquation(distance);
	ctx.drawImage(cornerImage, corners[index].x-cornerSizes[index]/2, corners[index].y-cornerSizes[index]/2,
				cornerSizes[index], cornerSizes[index]);
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

/**
 * @returns {Array} The corner elements as an Array.
 */
function getCornersArray() {
	return [tl, tr, bl, br];
}