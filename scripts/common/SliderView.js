var SliderView = InputZoneView.extend({
    template: '#inputZoneTemplate',
    initialize: function(options) {
        this.iconLeft = options.iconLeft || '';
        this.iconRight = options.iconRight || '';
        this.labelLeft = options.labelLeft || '';
        this.labelRight = options.labelRight || '';
        this.eventId = options.eventId;
        this.eventCatcher = options.eventCatcher;

        this.vent = options.vent;
    },

    _getMovementPercent: function(data) {
        data.preventDefault();
        var x = data.originalEvent.touches[0].pageX;
        var offsetX = x - $('#inputZone2Content').offset().left-25;
        var percentageX = offsetX / 750;
        return this._getValidValue(percentageX, 0, 1);  
    },

    touch: function(data) {
        this.vent.trigger(this.eventId + ':touchStart', this._getMovementPercent(data));
    },

    change: function(data) {
        this.vent.trigger(this.eventId + ':touchMove', this._getMovementPercent(data));
    },

    release: function(data) {
        this.vent.trigger(this.eventId + ':touchEnd', data);
    },

    onRender: function() {
        (this.$el).find('.iconLeft').copyIn(this.iconLeft);
        (this.$el).find('.iconRight').copyIn(this.iconRight);
        (this.$el).find('.labelLeft').html(this.labelLeft);
        (this.$el).find('.labelRight').html(this.labelRight);
    }, 

    onClose: function() {
        $(this.eventCatcher).off("." + this.cid);
    },

    onShow: function() {
        $(this.eventCatcher)
            .on('touchstart.' + this.cid, (_.bind(this.touch, this)))
            .on('touchmove.' + this.cid, (_.bind(this.change, this)))
            .on('touchend.' + this.cid, (_.bind(this.release, this)));
    }
});


