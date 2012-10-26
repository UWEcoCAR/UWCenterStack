/**
 * Unit tests for t2c.js.
 */

//FUNCTION OVERRIDES
currentTime = function() {
	return 10000;
}

timeFrom = function(time) {
	return 5000;
}

/**
 * @see Drag(startingPosition)
 */
test("DragTest", function() {
	
	// Initialize drag
	var startPos = new Position(0,0);
	var drag = new Drag(startPos);
	
	// Test constructor
	equal(drag.startTime, 10000);
	equal(drag.duration, 0);
	equal(drag.distance, 0);
	equal(drag.displacement, 0);
	equal(drag.inProgress, true);
	equal(drag.currentPos, startPos);
	equal(drag.startPos, startPos);
	
	// Simulate drag
	drag.addPosition(new Position(3,0));
	drag.addPosition(new Position(3,4));
	drag.end();
	
	// Test drag
	equal(drag.startTime, 10000);
	equal(drag.duration, 5000);
	equal(drag.distance, 7);
	equal(drag.displacement, 5);
	equal(drag.inProgress, false);
	equal(drag.currentPos.x, 3); // For some reason testing drag.currentPos against a Position object wouldn't work!
	equal(drag.currentPos.y, 4);
	equal(drag.startPos, startPos);
});

/**
 * @see sizeEquation(distance)
 */
test("sizeEquation", function() {
	equal(sizeEquation(1000), 200);
	equal(sizeEquation(400), 200);
	equal(sizeEquation(300), 250);
	equal(sizeEquation(200), 300);
	equal(sizeEquation(100), 350);
	equal(sizeEquation(0), 400);
});


/**
 * @see isT2c()
 * NOTE: not a very thurough test yet
 */
test("testIsT2C", function() {
	drag = new Drag(new Position(0,0));
	drag.duration = 10000;
	drag.displacement = 500;
	drag.distance = 100;
	ok(!isT2c())
	
	drag.duration = 100;
	drag.displacement = 100;
	drag.distance = 100;
	ok(isT2c());
});