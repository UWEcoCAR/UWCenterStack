var SliderButtonsView = InputZoneView.extend({
    
    initialize: function(options) {
        this.eventId = options.eventId;
        this.buttonLeft = options.buttonLeft || "";
        this.buttonRight = options.buttonRight || "";
        this.iconLeft = options.iconLeft || '';
        this.iconRight = options.iconRight || '';
        this.labelLeft = options.labelLeft || '';
        this.labelRight = options.labelRight || '';
        this.eventCatcher = options.eventCatcher || '';
        this.vent = options.vent;
    },

    touchStart: function(data) {
        if (this._getMovementPercent(data) < 0.05) {
            this.$el.addClass('touchLeft');
        } else if (this._getMovementPercent(data) > 0.95) {
            this.$el.addClass('touchRight');
        }
    },

    touchEnd: function() {
        this.$el.removeClass('touchLeft touchRight');
    },

    clicked: function(data) {
        if (data.offsetX < 200) {
            this.vent.trigger(this.eventId + ':clickLeft', data, this.buttonLeft);
        } else if (data.offsetX > 600) {
            this.vent.trigger(this.eventId + ':clickRight', data, this.buttonRight);
        }
    },

    onRender: function() {
        (this.$el).find('.iconLeft').copyIn(this.iconLeft);
        (this.$el).find('.iconRight').copyIn(this.iconRight);
        (this.$el).find('.labelLeft').html(this.labelLeft);
        (this.$el).find('.labelRight').html(this.labelRight);
    },

    onClose: function() {
        $(this.eventCatcher).off('.' + this.cid);
    },

    onShow: function() {
        $(this.eventCatcher).on('touchstart.' + this.cid, _.bind(this.touchStart, this));
        $(this.eventCatcher).on('touchend.' + this.cid, _.bind(this.touchEnd, this));
        $(this.eventCatcher).on('click.' + this.cid, _.bind(this.clicked, this));
    }
});