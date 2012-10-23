/**
 * Unit tests for common.js.
 */

//FUNCTION OVERRIDES
Date.prototype.getTime = function() {
	return 10000;
}

/**
 * @see currentTime()
 */
test("currentTimeTest", function() {
	equal(currentTime(), 10000);
});

/**
 * @see timeFrom(begin)
 */
test("timeFromTest", function() {
	equal(timeFrom(4000), 6000);
});

/**
 * @see Position(x, y)
 */
test("PositionTest", function() {
	var position = new Position(6, 8);
	equal(position.x, 6);
	equal(position.y, 8);
	
	position.x = 3;
	position.y = 4;
	equal(position.x, 3);
	equal(position.y, 4);
});

/**
 * @see distanceFrom(position)
 */
test("distanceFromTest", function() {
	var position = new Position(3, 4);
	equal(position.distanceFrom(new Position(0, 0)), 5);
	equal(position.distanceFrom(new Position(3, 4)), 0);
	equal(position.distanceFrom(new Position(-3, -4)), 10);
	equal(position.distanceFrom(undefined), undefined);
});