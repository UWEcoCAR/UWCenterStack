var VolumeSliderView = SliderView.extend({
    initialize: function(options) {
        SliderView.prototype.initialize.apply(this, [_.extend({
            iconLeft: '#volumeDownIcon',
            iconRight: '#volumeUpIcon',
            eventCatcher: '#volumeSliderZoneEventCatcher',

        }, options)]);
        this.vibrationSelection = -1;
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

    click: function(data) {
        this.clickMotion = true;
        data.preventDefault();
        var newVibrationSelection =  Math.round(this._getMovementPercentClick(data) * 30);
        if (this.vibrationSelection !== newVibrationSelection) {
            Controllers.Haptic.mainPulse();
            this.vibrationSelection = newVibrationSelection;
        }
        Controllers.Music.setVolume(this._getMovementPercentClick(data));
    },

    clickChange: function(data) {
        if (this.clickMotion) {
            data.preventDefault();
            var newVibrationSelection =  Math.round(this._getMovementPercentClick(data) * 30);
            if (this.vibrationSelection !== newVibrationSelection) {
                Controllers.Haptic.mainPulse();
                this.vibrationSelection = newVibrationSelection;
            }
            Controllers.Music.setVolume(this._getMovementPercentClick(data));
        }
    },

    release: function() {
        this.clickMotion = false;
    },

    redraw: function() {
        this.$el.toggle(Controllers.Music.isPlaying());
    }

});