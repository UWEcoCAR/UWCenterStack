var SliderView = InputZoneView.extend({
    template: '#inputZoneTemplate',
    initialize: function(options) {
        this.iconLeft = options.iconLeft || '';
        this.iconRight = options.iconRight || '';
        this.leftLabel = options.leftLabel || '';
        this.rightLabel = options.rightLabel || '';

        this.vent = options.vent;
        $(options.eventCatcher)
            .on('touchstart', (_.bind(this.touch, this)))
            .on('touchmove', (_.bind(this.change, this)))
            .on('touchend', (_.bind(this.release, this)));
    },

    _getMovementPercent: function(data) {
        data.preventDefault();
        var x = data.originalEvent.touches[0].pageX;
        var offsetX = x - $('#inputZone2Content').offset().left;
        var percentageX = offsetX / 800;
        return this._getValidValue(percentageX, 0, 1);  
    },

    touch: function(data) {
        this.vent.trigger('slider:touchStart', this._getMovementPercent(data));
    },

    change: function(data) {
        this.vent.trigger('slider:touchMove', this._getMovementPercent(data));
    },

    release: function(data) {
        this.vent.trigger('slider:touchEnd', data);
    },

    onRender: function() {
        (this.$el).find('.iconLeft').copyIn(this.iconLeft);
        (this.$el).find('.iconRight').copyIn(this.iconRight);
        (this.$el).find('.leftLabel').html(this.leftLabel);
        (this.$el).find('.rightLabel').html(this.rightLabel);
    }
});


