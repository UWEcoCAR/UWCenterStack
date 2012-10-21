/**
 * @author Nicholas Clawson & Mitchell Loeppky
 */

// ELEMENTS
/**
 * paragraph element to print debug info
 */
var debug;

/**
 * corner image elements
 */
var tl, //top left
	tr, //top right
	bl, //bottom left
	br; //bottom right

/**
 * array of all corner image elements
 */
var corners; // array of corner images

// VARIABLES
/**
 * width and height of window
 */
var width,
	height;

/**
 * Position objects for last known position and starting position of pointer event
 */
var lastPos,
	startPos;

/**
 * time in milliseconds since unix epoch, set every call to onStart()
 */
var startTime; // saves start time of touch

/**
 * distance travelled, set to 0 on onStart() increased onMove()
 */
var pathL; // distance travelled over entire touch sequence

/**
 * flag, true when mouse is held down or finger on screen
 */
var isDown = false; // true if finger is on screen or mouse button is down

// CONSTANTS
/**
 * Normal radius of the corner element in pixels
 */
var NORMAL_SIZE = 100;

/**
 * pixels from edge of outer corner to start scaling up
 */
var SENSITIVITY = 200;

/**
 *  maximum radius of corner, when pointer is at extreme corner
 */
var MAX_SIZE = 200;

/**
 * maximum time a valid swipe can take
 */
var MAX_TIME = 1000;

/**
 * maximum ration of distance/displacement for a valid swipe
 * DO NOT GO BELOW 1
 */
var DIRECTNESS = 1.2;

window.onload = onLoad;

/**
 * Called when window is initially loaded
 * 
 * Adds all necessary event listeners for touch and mouse control
 * retrieves necessary element doms from html file
 * gets window height and width
 * sets size and margin of each corner element
 */
function onLoad() {
	document.addEventListener("touchstart", onTouchStart, false);
	document.addEventListener("touchmove", onTouchMove, false);
	document.addEventListener("touchend", onTouchEnd, false);
	
	// NONE OF THESE ARE NEEDED FOR TOUCHSCREEN
	document.addEventListener("mousedown", onMouseDown, false);
	document.addEventListener("mouseup", onMouseUp, false);
	document.addEventListener("mousemove", onMouseMove, false);
	
	debug = $("#coord");
	tl = $("#tl");
	tr = $("#tr");
	bl = $("#bl");
	br = $("#br");
	corners = $(".corner");
	buttons = $(".btn");
	
	width = window.innerWidth;
	height = window.innerHeight;
		
	corners.css("-webkit-transition", "width 0s, height 0s, margin 0s");
	corners.width(NORMAL_SIZE*2);
	corners.height(NORMAL_SIZE*2);
	corners.css("margin", -NORMAL_SIZE + "px");
}

/**
 * Called when pointer sequence starts
 * 
 * Should be started by onMouseDown or onTouchStart
 * Creates position object to represent starting coordinates
 * Creates duplicate object to represent last known position
 * Gets time in milliseconds since the unix epoch
 * Sets path traveled to 0
 * Sets isDown flag to true
 * Changes css transition
 *
 * @param x x-coordinate of pointer event
 * @param y y-coordinate of pointer event
 */
function onStart(x, y) {
	posLast = new Position(x,y);
	posStart = new Position(x,y);
	startTime = currentTime();
	pathL = 0;
	isDown = true;
	debug.css("background", "blue");
	debug.html("started");
	corners.css("-webkit-transition", "width 0s, height 0s, margin 0s");
}

/**
 * Called every time pointer position moves in order to calculate path traveled
 * 
 * Adds on distance travelled from last position to pathL
 * changes last known position to current position
 * 
 * @param x current x-coordinate of pointer
 * @param y current y-coordinate of pointer
 */
function onMove(x, y) {
	pathL += posLast.distanceFrom(new Position(x,y));
	posLast.x = x;
	posLast.y = y;
	debug.html("(" + posLast.x + "/" + width +", " + posLast.y + "/" + height +")");
	drawCorner(posLast.distanceFrom(new Position(0,0)), tl);
	drawCorner(posLast.distanceFrom(new Position(width,0)), tr);
	drawCorner(posLast.distanceFrom(new Position(0,height)), bl);
	drawCorner(posLast.distanceFrom(new Position(width,height)), br);
}

/**
 *  Called when pointer sequence ends, either from unclicking or lifting finger
 *  
 *  sets isDown flag to false
 *  TODO should call click() if duration of pointer sequence is less than MAX_TIME and path is straight enough
 *  Changes css transition values
 *  Changes each corners size and margin
 */
function onEnd() {
	isDown = false;
	debug.html("Time = " + timeFrom(startTime) + 
	"<br />Distance = " + pathL + 
	"<br />Displacement = " + posLast.distanceFrom(posStart) + 
	"<br />Distance/Displacement = " + pathL/posLast.distanceFrom(posStart));
	
	if(timeFrom(startTime)  <= MAX_TIME && posLast.distanceFrom(posStart)*DIRECTNESS > pathL && click(posLast.x, posLast.y)){
		debug.css("background", "green");
		// click(posLast.x, posLast.y)
	} else {
		debug.css("background", "red");
	}
	
	corners.css("-webkit-transition", "width .6s, height .6s, margin .6s");
	corners.width(NORMAL_SIZE*2);
	corners.height(NORMAL_SIZE*2);
	corners.css("margin", -NORMAL_SIZE + "px");
}

/**
 * Called to see if a valid swipe ended in a corner
 * 
 * checks the distance of the click from each corner
 * saves which corner was clicked to c
 * 
 * @returns {Boolean} true if swipe ended in corner
 */
function click() { 
	var c;
	if (posLast.distanceFrom(new Position(0,0)) < sizeEquation(posLast.distanceFrom(new Position(0,0)))/2){
		c = "tl";
	} else if (posLast.distanceFrom(new Position(width,0)) < sizeEquation(posLast.distanceFrom(new Position(width,0)))/2){
		c = "tr";
	} else if (posLast.distanceFrom(new Position(0,height)) < sizeEquation(posLast.distanceFrom(new Position(0,height)))/2){
		c = "bl";
	} else if (posLast.distanceFrom(new Position(width,height)) < sizeEquation(posLast.distanceFrom(new Position(width,height)))/2){
		c = "br";
	} else {
		c = "no"
	}
	debug.html(debug.html() + "<br />" + c);
	return c != "no"
}

/**
 * Sets the size and margin for a corner
 * 
 * @param distance distance from pointer event to corner
 * @param corner corner element in question
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
 * @param distance from corner
 * @returns {Number} ideal size of corner
 */
function sizeEquation(distance){
	return Math.max(NORMAL_SIZE*2+SENSITIVITY-distance, 0)/(NORMAL_SIZE*2+SENSITIVITY)*(MAX_SIZE*2-NORMAL_SIZE*2) + NORMAL_SIZE*2;
}
/**
 * Event handler for when finger touches screen
 * 
 * Calls onStart()
 * 
 * @param e touch event
 */
function onTouchStart(e) {
//	e.preventDefault();
	onStart(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
	
}

/**
 * Event handler for when finger is dragged
 * 
 * Calls onMove()
 * 
 * @param e touch event
 */
function onTouchMove(e) {
	if (e.targetTouches.length == 1){
		e.preventDefault();
		onMove(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
	}
}

/**
 * Event handler for when finger is lifted
 * 
 * Calls onEnd()
 * 
 * @param e touch event
 */
function onTouchEnd(e) {
//	e.preventDefault();
	onEnd();
}

/**
 * Event handler for when left mouse button is held down
 * 
 * Calls onStart()
 * @param e click event
 */
function onMouseDown(e) {
	onStart(e.pageX, e.pageY);
}

/**
 * Event handler for when mouse pointer is moved
 * 
 * Calls onMove()
 * 
 * @param e mouse event
 */
function onMouseMove(e) {
	if (isDown){
		onMove(e.pageX, e.pageY);
	}
}

/**
 * Event handler for when left mouse button is lifted
 * 
 * Calls onEnd()
 * 
 * @param e mouse event
 */
function onMouseUp(e) {
	onEnd();
}