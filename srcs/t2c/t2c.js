// T2C algorithm;

var debug; // paragraph to print debug info

// refers to corner images
var tl, //top left
	tr, //top right
	bl, //bottom left
	br; //bottom right

var corners; // array of corner images

var buttons; // array of all buttons

var width, // width of window
	height; // height of window

var lastPos,
	startPos;

var startTime; // saves start time of touch
var pathL; // distance travelled over entire touch sequence
var isDown = false; // true if finger is on screen or mouse button is down

var NORMAL_SIZE = 100; // normal radius of corner
var SENSITIVITY = 200; // distance from edge of corner to start scaling corner
var MAX_SIZE = 200; // maximum radius of the corner

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
	
	corners.css("-webkit-transition", "width 0s, height 0s, margin 0s");
	corners.width(NORMAL_SIZE*2);
	corners.height(NORMAL_SIZE*2);
	corners.css("margin", -NORMAL_SIZE + "px");
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
	posLast = new Position(x,y);
	posStart = new Position(x,y);
	startTime = currentTime();
	pathL = 0;
	isDown = true;
	debug.css("background", "blue");
	debug.html("started");
	corners.css("-webkit-transition", "width 0s, height 0s, margin 0s");
}

function onMove(x, y) {
	pathL += posLast.distanceFrom(new Position(x,y));
	posLast.x = x;
	posLast.y = y;
	debug.html("(" + posLast.x + "/" + width +", " + posLast.y + "/" + height +")");
	drawCorner(distance(0,0,posLast.x,posLast.y), tl);
	drawCorner(distance(width,0,posLast.x,posLast.y), tr);
	drawCorner(distance(0,height,posLast.x,posLast.y), bl);
	drawCorner(distance(width,height,posLast.x,posLast.y), br);
}


function onEnd() {
	isDown = false;
	debug.html("Time = " + timeFrom(startTime) + 
	"<br />Distance = " + pathL + 
	"<br />Displacement = " + distance(posLast.x, posLast.y, posStart.x, posStart.y) + 
	"<br />Distance/Displacement = " + pathL/distance(posLast.x, posLast.y, posStart.x, posStart.y));
	
	if(timeFrom(startTime)  <= MAX_TIME && distance(posLast.x, posLast.y, posStart.x, posStart.y)*DIRECTNESS > pathL && click(posLast.x, posLast.y)){
		debug.css("background", "green");
	} else {
		debug.css("background", "red");
	}
	
	corners.css("-webkit-transition", "width .6s, height .6s, margin .6s");
	corners.width(NORMAL_SIZE*2);
	corners.height(NORMAL_SIZE*2);
	corners.css("margin", -NORMAL_SIZE + "px");
}

// appends the name of the corner that was swiped to the debug.innerHTML
// takes in ending x and y coordinates of pointer
// returns true if the touch sequence ended on a corner
function click(x, y) { 
	var c;
	if (distance(x,y, 0, 0) < sizeEquation(distance(x,y,0,0))/2){
		c = "tl";
	} else if (distance(x,y, width, 0) < sizeEquation(distance(x,y,width,0))/2){
		c = "tr";
	} else if (distance(x,y, 0, height) < sizeEquation(distance(x,y,0,height))){
		c = "bl";
	} else if (distance(x,y, width, height) < sizeEquation(distance(x,y,width,height))/2){
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
	var size = sizeEquation(distance);
	corner.width(size); 
	corner.height(size);
	corner.css("margin", -size/2 +"px");
}

function sizeEquation(distance){
	return Math.max(NORMAL_SIZE*2+SENSITIVITY-distance, 0)/(NORMAL_SIZE*2+SENSITIVITY)*(MAX_SIZE*2-NORMAL_SIZE*2) + NORMAL_SIZE*2;
}

// returns the distance in pixels from point1 to point2
// takes in the x+y location of both points
function distance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
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