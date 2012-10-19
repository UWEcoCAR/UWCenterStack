/**
 * Unit tests for common.js.
 */

function Date() {
	this.getTime = function() {
		return 10000;
	}
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