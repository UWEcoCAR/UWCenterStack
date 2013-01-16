/**
 * A collection of utility functions and constants.
 */

/**
 * @param begin The time (in milliseconds) to compare against the current time.
 * @returns The number of milliseconds elapsed since the given begin time.
 */

function timeFrom(begin) {
	return currentTime() - begin;
}

/**
 * @returns The current time in milliseconds.
 */
function currentTime() {
	return new Date().getTime()
}

/**
 * @returns The average of @param a and @param b.
 */
function average(a,b) {
	return (a + b)/2;
}

/**
 * Creates a new Position.
 * @class Represents a position (or point) in 2D space.
 * @param x The x coordinate
 * @param y The y coordinate
 * @returns Position object
 */
function Position(x, y) {
	this.x = x;
	this.y = y;
	
	/**
	 * @param position The position in which to determine the distance from.
	 * @returns The distance between this position and the given position.
	 * If the given position is undefined, then undefined is returned.
	 */
	this.distanceFrom = function(position) {
		if (position) {
			return Math.sqrt(Math.pow(this.x-position.x, 2) + Math.pow(this.y-position.y, 2));
		}
		return undefined;
	}
}