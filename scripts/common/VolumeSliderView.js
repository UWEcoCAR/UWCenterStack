var VolumeSliderView = SliderView.extend({
    initialize: function(options) {
        SliderView.prototype.initialize.apply(this, [_.extend({
            iconLeft: '#volumeDownIcon',
            iconRight: '#volumeUpIcon',
            eventCatcher: '#volumeSliderZoneEventCatcher',

        }, options)]);
    },

    touch: function(data) {
        this.moveStart = moment();
        data.preventDefault();
        if (Music.isPlaying()) {
            Music.setVolume(this._getMovementPercent(data));
        }
    },

    change: function(data) {
        this.moveStart = undefined;
        data.preventDefault();
        if (Music.isPlaying()) {
            console.log(this._getMovementPercent(data));
        	Music.setVolume(this._getMovementPercent(data));
        }
    },

    release: function(data) {
        if (this.moveStart && moment().diff(this.moveStart) < _.sliderDotThreshold()) {
            this.triggerDots();
        }
    },

});