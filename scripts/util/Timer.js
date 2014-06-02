/**
 * Provides alternative timing functions with higher accuracy than the default javascript functions
 * (i.e. setInterval, setTimeout). More specifically, the JS setInterval function will accumulate error
 * (e.g. setInterval(callback, 1000) can be off by about a second after 300 seconds. Timer.setInterval, does not
 * accumulate error by using the hrtime function.
 *
 * There is lots of functionality missing, including clearing intervals, setting timeouts.
 * @type {Function}
 */
var Timer = Marionette.Controller.extend({

    /**
     * Starts a timer that will call the callback function every interval number of milliseconds within the given
     * number of accuracy milliseconds without accumulating error (i.e. even after an hour, the callback will still only
     * be off by at most the given accuracy).
     * @param interval The time between callbacks (in milliseconds)
     * @param accuracy The acceptable amount of error (in milliseconds). The smaller the error, the worse the performace.
     * @param callback The function to callback every interval.
     */
    setInterval: function(interval, accuracy, callback) {
        var startTime = process.hrtime();
        var intervalTime = 0;
        this.interval = setInterval(_.bind(function() {
            var time = process.hrtime(startTime);
            var newIntervalTime = (time[0] * 1e3 + time[1] / 1e6) % interval;
            if (newIntervalTime < intervalTime) {
                callback(newIntervalTime);
            }
            intervalTime = newIntervalTime;
        }, this), accuracy);
    },

    /**
     * Stops the timer set by setInterval.
     * @returns {*}
     */
    clearInterval: function() {
        return clearInterval(this.interval);
    }

});