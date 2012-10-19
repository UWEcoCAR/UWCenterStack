function Date() {
	this.getTime = function() {
		return 10000;
	}
}

test("currentTimeTest", function() {
	equal(currentTime(), 10000);
});

test("timeFromTest", function() {
	equal(timeFrom(4000), 6000);
});