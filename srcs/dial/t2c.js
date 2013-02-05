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
	parent = document.getElementById("parent");
		parent.style.height = height + "px";
		parent.style.width = width + "px";
		parent.style.overflow = "hidden";
	
	UIList = new UIElementList(parent);

// CREATE ALL UI ELEMENTS
	// create dials
	dial = new Dial("bigDial", 'dial.png', 400, new Position(width/2, height/2));
	UIList.add(dial);

	//create corners
	var tl = new Corner("tl", 'circle.png', new Position(0,0));
	var tr = new Corner("tr", 'circle.png', new Position(width,0));
	var bl = new Corner("bl", 'circle.png', new Position(0,height));
	var br = new Corner("br", 'circle.png', new Position(width,height));

	UIList.add(tl);
	UIList.add(tr);
	UIList.add(bl);
	UIList.add(br);

	// create buttons
	var l = new Button("l", 'buttonUp.png', 'buttonDown.png', 100, new Position(width/2 - 150, height - 100));
	var m = new Button("m", 'buttonUp.png', 'buttonDown.png', 100, new Position(width/2, height - 50));
	var r = new Button("r", 'buttonUp.png', 'buttonDown.png', 100, new Position(width/2 +150, height - 100));

	UIList.add(l);
	UIList.add(m);
	UIList.add(r);

	// // create guide
	// 	var guide = new Guide("guide", 'circle.png', MAX_SIZE);
	// 	UIList.add(guide);


	rSlider = new Slider("rSlider", "buttonUp.png", 100, new Position(width/2, height/2), 350, Math.PI/4, 0, true);
	lSlider = new Slider("rSlider", "buttonUp.png", 100, new Position(width/2, height/2), 350, Math.PI/4, 4, false);


	UIList.add(rSlider);
	UIList.add(lSlider);

	// var sliderImage = new Image();
	// sliderImage.onload = function() {
	// 	var rSlider = new Slider(dialCtx, "rSlider", sliderImage, new Position(width/2, height/2), 350, Math.PI/4, -Math.PI/4, true);
	// 	var lSlider = new Slider(dialCtx, "lSlider", sliderImage, new Position(width/2, height/2), 350, Math.PI/4*3, - Math.PI/4 *3, false);
	// 	UIList.add(rSlider);
	// 	UIList.add(lSlider);
	// 	UIList.draw();
	// }
	// sliderImage.src = 'buttonUp.png';

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