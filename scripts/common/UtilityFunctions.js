/**
 * Utility functions for project
 */

// Marrionette extensions
_.extend(Backbone.Marionette.View.prototype, {
    // will return a value that will be rounded to the closest boundary if it exceeds
    // the range between them
    _getValidValue: function(value, leftBoundary, rightBoundary) {
        value = Math.min(value, rightBoundary);
        value = Math.max(value, leftBoundary);
        return value;  
    }
});


// jQuery extensions
$.fn.copyIn = function(element) {
    this.html($(element).clone());
};

// Underscore extensions
_.mixin({
    equal: function(string1, string2) {
        return string1.localeCompare(string2) === 0;
    },

    /*
        The duration of the slider dot animation (in milliseconds)
     */
    sliderDotDuration: function() {
        return 1500;
    },

    /*
        The maximum amount of time (in milliseconds) the user can hold their finger on the slider
        without moving and still be considered a click.
    */
    sliderDotThreshold: function() {
        return 500;
    }
});