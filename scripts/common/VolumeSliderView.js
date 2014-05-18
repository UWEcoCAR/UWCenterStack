var VolumeSliderView = SliderView.extend({
    initialize: function(options) {
        SliderView.prototype.initialize.apply(this, [_.extend({
            iconLeft: '#volumeDownIcon',
            iconRight: '#volumeUpIcon',
            eventCatcher: '#volumeSliderZoneEventCatcher',

        }, options)]);
    },

    onShow: function() {
        SliderView.prototype.onShow.apply(this);
        this.redraw();

        this.listenTo(Controllers.Music, 'start stop', this.redraw);
    },

    touch: function(data) {
        data.preventDefault();
        Controllers.Music.setVolume(this._getMovementPercent(data));
    },

    change: function(data) {
        data.preventDefault();
        Controllers.Music.setVolume(this._getMovementPercent(data));
    },

    release: function() {},

    redraw: function() {
        this.$el.toggle(Controllers.Music.isPlaying());
    }

});