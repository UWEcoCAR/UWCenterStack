/**
 * Utility functions for project
 */
_.extend(Backbone.Marionette.View.prototype, {
    _getMovementPercent: function(data) {
        data.preventDefault();
        var x = data.originalEvent.touches[0].pageX;
        var offsetX = x - $("#inputZone2Content").offset().left;
        var percentageX = offsetX / 800;
        percentageX = Math.min(percentageX, 1);
        percentageX = Math.max(percentageX, 0);
        return percentageX;  
    }
});