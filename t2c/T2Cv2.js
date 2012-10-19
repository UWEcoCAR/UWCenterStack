// T2C algorithm;

var debug; // paragraph to print debug info

// refers to corner images
var tl; //top left
var tr; //top right
var bl; //bottom left
var br; //bottom right

var corners; // array of corner images

var buttons; // array of all buttons

var width; // width of window
var height; // height of window

// variable for touch move to store where it came from for calculating pathL
// keep global because it saves space...
var lastX;
var lastY;

//saves initial touch location onStart
var startX; 
var startY;

var startTime; // saves start time of touch
var pathL; // distance travelled over entire touch sequence
var isDown = false; // true if finger is on screen or mouse button is down

var CORNER_SIZE = 200; // diameter of corner
var SENSITIVITY = 150; // distance from edge of corner to start scaling corner

var MAX_TIME = 1000; // maximum time a swipe to the corner will register as a valid swipe
var DIRECTNESS = 1.2; // minimum value for distance/displacement for the swipe to register

// called when the document is initially loaded
// adds necessary event listeners to document
// gets and initializes necessary elements/variables
// puts event listener on all buttons
// sets size of each corner
function onLoad() {
	document.addEventListener("touchstart", onTouchStart, false);
	document.addEventListener("touchmove", onTouchMove, false);
	document.addEventListener("touchend", onTouchEnd, false);
//	document.addEventListener("touchcancel", onTouchCancel, false);
	
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
	
	buttons.onclick = clicked;
	buttons.touchenter = touchEnter;
	buttons.touchleave = touchLeave;
	
	corners.css("-webkit-transition", "width 0s, height 0s, margin 0s");
	corners.width(CORNER_SIZE);
	corners.height(CORNER_SIZE);
	corners.css("margin", -CORNER_SIZE/2 + "px");
}

function clicked() {
	this.html("CLICKED");
}

function touchEnter() {
	this.html("entered");
}

function touchLeave() {
	this.html("left");
}


function onStart(x, y) {
	lastX = x;
	lastY = y;
	startX = lastX;
	startY = lastY;
	startTime = new Date().getTime();
	pathL = 0;
	isDown = true;
	debug.css("background", "blue");
	debug.html("started");
	corners.css("-webkit-transition", "width 0s, height 0s, margin 0s");
}

function onMove(x, y) {
	pathL += Math.sqrt(Math.pow(lastX -x, 2) + Math.pow(lastY-y, 2));
	lastX = x;
	lastY = y;
	debug.html("(" + lastX + "/" + width +", " + lastY + "/" + height +")");
	drawCorner(distance(0,0,lastX,lastY), tl);
	drawCorner(distance(width,0,lastX,lastY), tr);
	drawCorner(distance(0,height,lastX,lastY), bl);
	drawCorner(distance(width,height,lastX,lastY), br);
}


function onEnd() {
	isDown = false;
	debug.html("Time = " + timeFrom(startTime) + 
	"<br />Distance = " + pathL + 
	"<br />Displacement = " + distance(lastX, lastY, startX, startY) + 
	"<br />Distance/Displacement = " + pathL/distance(lastX, lastY, startX, startY));
	
	if(timeFrom(startTime)  <= MAX_TIME && distance(lastX, lastY, startX, startY)*DIRECTNESS > pathL && click(lastX, lastY)){
		debug.css("background", "green");
	} else {
		debug.css("background", "red");
	}
	
	corners.css("-webkit-transition", "width .6s, height .6s, margin .6s");
	corners.width(CORNER_SIZE);
	corners.height(CORNER_SIZE);
	corners.css("margin", -CORNER_SIZE/2 + "px");
}

// appends the name of the corner that was swiped to the debug.innerHTML
// takes in ending x and y coordinates of pointer
// returns true if the touch sequence ended on a corner
function click(x, y) {
	var c;
	if (distance(x,y, 0, 0) < 136){
		c = "tl";
	} else if (distance(x,y, width, 0) < 136){
		c = "tr";
	} else if (distance(x,y, 0, height) < 136){
		c = "bl";
	} else if (distance(x,y, width, height) < 136){
		c = "br";
	} else {
		c = "no"
	}
	debug.html(debug.html() + "<br />" + c);
	return c != "no"
}

// takes in a corner element, and the distance of the pointer from that element
// scales the corner based off the "magic" equation
function drawCorner(distance, corner) {
	// TODO: make this equation make sense...
	var size = Math.max((((2*SENSITIVITY+CORNER_SIZE)/2-distance)/(2*SENSITIVITY))*CORNER_SIZE+CORNER_SIZE, CORNER_SIZE);
	corner.width(size); 
	corner.height(size);
	corner.css("margin", -size/2 +"px");
}

// returns the distance in pixels from point1 to point2
// takes in the x+y location of both points
function distance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
}

// returns the time elapsed since the 'begin' object was created
// 'begin' object should be created from new Date().getTime();
function timeFrom(begin) {
	return new Date().getTime() - begin;
}

function onTouchStart(e) {
//	e.preventDefault();
	onStart(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
	
}

function onTouchMove(e) {
	if (e.targetTouches.length == 1){
		e.preventDefault();
		onMove(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
	}
}

function onTouchEnd(e) {
//	e.preventDefault();
	onEnd();
}

function onMouseDown(e) {
	onStart(e.pageX, e.pageY);
}

function onMouseMove(e) {
	if (isDown){
		onMove(e.pageX, e.pageY);
	}
}

function onMouseUp(e) {
	onEnd();
}