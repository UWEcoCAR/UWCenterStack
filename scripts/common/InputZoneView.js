var InputZoneView = Backbone.Marionette.ItemView.extend({
    template: '#inputZoneTemplate',
    className: 'inputZone',

    _getMovementPercent: function(data) {
        var x = data.originalEvent.touches[0].pageX;
        var offsetX = x - $(data.originalEvent.target).offset().left-25;
        var percentageX = offsetX / 750;
        return this._getValidValue(percentageX, 0, 1);
    }
});