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

/**
 * @class Represents a mouse or finger dragging across the screen.
 * Contains time, distance, and displacement information about the drag.
 * 
 * @param {Position} The starting position of the drag.
 */
function Drag(startingPosition) {
	this.startTime = currentTime();		// the start time (in milliseconds) of the Drag
	this.duration = 0;					// the elapsed time (in milliseconds) of the Drag
	this.distance = 0;					// distance traveled over entire Drag
	this.displacement = 0;				// distance between the beginning and end of the Drag
	this.inProgress = true;				// true if Drag is still in progress
	this.isScroll = false;				// true if two fingers are down
	this.currentPos = startingPosition;	// The last know position of the Drag
	this.startPos = startingPosition;	// The position where the Drag started
	
	/**
	 * Adds the given position to the Drag. 
	 * Should be called when the user moves the mouse or their finger.
	 */
	this.addPosition = function(position) {
		this.distance += this.currentPos.distanceFrom(position);
		this.displacement = this.startPos.distanceFrom(position);
		this.currentPos = position;
		this.duration = timeFrom(this.startTime);
	}
	
	/**
	 * Ends the Drag.
	 * Should be called when the user releases the mouse or removes their finger.
	 */
	this.end = function() {
		this.inProgress = false;
		this.isDrag = false;
		this.duration = timeFrom(this.startTime);
	}
}