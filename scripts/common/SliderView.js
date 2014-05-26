var SliderView = InputZoneView.extend({
    className: InputZoneView.prototype.className + ' slider',
    initialize: function(options) {
        this.iconLeft = options.iconLeft || '';
        this.iconRight = options.iconRight || '';
        this.labelLeft = options.labelLeft || '';
        this.labelRight = options.labelRight || '';
        this.eventId = options.eventId;
        this.eventCatcher = options.eventCatcher;

        this.vent = options.vent;
        this.clickMotion= false;
    },

    touch: function(data) {
        this.moveStart = moment();
        data.preventDefault();
        this.vent.trigger(this.eventId + ':touchStart', this._getMovementPercent(data));
    },

    change: function(data) {
        this.moveStart = undefined;
        data.preventDefault();
        this.vent.trigger(this.eventId + ':touchMove', this._getMovementPercent(data));
    },

    release: function(data) {
        if (this.moveStart && moment().diff(this.moveStart) < _.sliderDotThreshold()) {
            this.triggerDots();
        }
        this.vent.trigger(this.eventId + ':touchEnd', data);
        this.clickMotion = false;
    },

    click: function(data) {
        this.clickMotion = true;
        this.moveStart = moment();
        data.preventDefault();
        this.vent.trigger(this.eventId + ':touchStart', this._getMovementPercentClick(data));
    },

    clickChange: function(data) {
        // if clicked and dragging
        if (this.clickMotion) {
            this.moveStart = undefined;
            data.preventDefault();
            this.vent.trigger(this.eventId + ':touchMove', this._getMovementPercentClick(data));
        }
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
            .on('mousedown.' + this.cid, (_.bind(this.click, this)))
            .on('mousemove.' + this.cid, (_.bind(this.clickChange, this)))
            .on('mouseup.' + this.cid, (_.bind(this.release, this)))
            .on('touchstart.' + this.cid, (_.bind(this.touch, this)))
            .on('touchmove.' + this.cid, (_.bind(this.change, this)));
    },

    triggerDots: function() {
        if (!this.$el.hasClass('active')) {
            this.$el.addClass('active');
            var el = this.$el;
            this.timeout = setTimeout(function() {
                el.removeClass('active');
            }, _.sliderDotDuration());
        }
    }
});


