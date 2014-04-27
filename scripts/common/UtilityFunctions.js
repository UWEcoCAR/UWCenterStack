/**
 * Utility functions for project
 */
var CanReadWriter = require('uwcenterstack-canreadwriter');
var canReadWriter = new CanReadWriter();
_.extend(Backbone.Marionette.View.prototype, {
    // will return a value that will be rounded to the closest boundary if it exceeds
    // the range between them
    _getValidValue: function(value, leftBoundary, rightBoundary) {
        value = Math.min(value, rightBoundary);
        value = Math.max(value, leftBoundary);
        return value;  
    }
});