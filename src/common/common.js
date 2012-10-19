/**
 * @param begin The time (in milliseconds since the UNIX epoch) to compare against the current time.
 * @returns The number of milliseconds elapsed since the given begin time.
 */
function timeFrom(begin) {
	return currentTime() - begin;
}

/**
 * @returns The current time in milliseconds since the UNIX epoch.
 */
function currentTime() {
	return new Date().getTime()
}