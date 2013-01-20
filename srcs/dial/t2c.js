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
	dialImage = new Image();
	dialImage.onload = function() {
		dial = new Dial(dialCtx, "bigDial", dialImage, 450, new Position(width/2, height/2));
		UIList.add(dial);
		UIList.draw();
	}
	dialImage.src = 'dial.png';

	//create corners
	cornerImage = new Image();
	cornerImage.onload = function() {
		tl = new Corner(cornerCtx, "tl", cornerImage, NORMAL_SIZE, SENSITIVITY, MAX_SIZE, new Position(0,0));
		tr = new Corner(cornerCtx, "tr", cornerImage, NORMAL_SIZE, SENSITIVITY, MAX_SIZE, new Position(width,0));
		bl = new Corner(cornerCtx, "bl", cornerImage, NORMAL_SIZE, SENSITIVITY, MAX_SIZE, new Position(0,height));
		br = new Corner(cornerCtx, "br", cornerImage, NORMAL_SIZE, SENSITIVITY, MAX_SIZE, new Position(width,height));

		UIList.add(tl);
		UIList.add(tr);
		UIList.add(bl);
		UIList.add(br);
		UIList.draw();
	}
	cornerImage.src = 'circle.png';

	// create buttons
	buttonImage1 = new Image();
	buttonImage1.onload = function() {
		buttonImage2 = new Image();
		buttonImage2.onload = function() {
			l = new Button(dialCtx, "l", buttonImage1, buttonImage2, 100, new Position(width/2 - 150, height - 100), "<<");
			m = new Button(dialCtx, "m", buttonImage1, buttonImage2, 100, new Position(width/2, height - 50), "||");
			r = new Button(dialCtx, "r", buttonImage1, buttonImage2, 100, new Position(width/2 +150, height - 100), ">>");

			UIList.add(l);
			UIList.add(m);
			UIList.add(r);
			UIList.draw();
		}
		buttonImage2.src = 'buttonDown.png';
	}
	buttonImage1.src = 'buttonUp.png';

	// create guide
	guideImage = new Image();
	guideImage.onload = function() {
		guide = new Guide(cornerCtx, "guide", guideImage, MAX_SIZE);
		UIList.add(guide);
		UIList.draw();
	}
	guideImage.src = 'circle.png'; 

	sliderImage = new Image();
	sliderImage.onload = function() {
		rSlider = new Slider(dialCtx, "rSlider", sliderImage, new Position(width/2, height/2), 350, Math.PI/4, -Math.PI/4, true);
		lSlider = new Slider(dialCtx, "lSlider", sliderImage, new Position(width/2, height/2), 350, Math.PI/4*3, - Math.PI/4 *3, false);
		tSlider = new Slider(dialCtx, "tSlider", sliderImage, new Position(width/2, height/2), 250, -Math.PI/4*3, -Math.PI/4, false);
		UIList.add(rSlider);
		UIList.add(lSlider);
		UIList.draw();
	}
	sliderImage.src = 'buttonUp.png';

	// finally draw UI Elements
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
	debug.html("started");
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

function trace(string) {
	if (false) {
		console.log(string)
	}
}