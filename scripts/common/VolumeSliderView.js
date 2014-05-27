var VolumeSliderView = SliderView.extend({
    initialize: function(options) {
        SliderView.prototype.initialize.apply(this, [_.extend({
            iconLeft: '#volumeDownIcon',
            iconRight: '#volumeUpIcon',
            eventCatcher: '#volumeSliderZoneEventCatcher',

        }, options)]);
        this.vibrationSelection = Math.round(Controllers.Music.getVolume() * 30);
        this.proportionalSelection = this.vibrationSelection;

        this.moving = false;
        this.move = 0;
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

        Controllers.Haptic.mainPulse();
        this.clickMotion = true;
        this.proportionalSelection = Math.round(this._getMovementPercentClick(data) * 30);
    },

    clickChange: function(data) {
        var percentageData = this._getMovementPercentClick(data);
        var self = this;
        if (this.clickMotion) {
            if (percentageData !== 0 && percentageData !==1 ) {
                this.moving = false;
                data.preventDefault();
                var newVibrationSelection =  this.vibrationSelection + Math.round(percentageData * 30) - this.proportionalSelection;
                this.proportionalSelection = Math.round(percentageData * 30);
                if (this.vibrationSelection !== newVibrationSelection) {
                    Controllers.Haptic.mainPulse();
                    this.vibrationSelection = this._getValidValue(newVibrationSelection, 0, 30);

                }
                Controllers.Music.setVolume(this.vibrationSelection/30);
            } else if (percentageData === 1) {
                if (!this.moving) {
                  this.move = setInterval(function() {
                        if (self.vibrationSelection < 30) {
                            self.vibrationSelection++;
                            self.proportionalSelection = Math.min(self.proportionalSelection+1, 30);
                        }
                        Controllers.Music.setVolume(self.vibrationSelection/30);
                    }, 500);
                    this.moving = true;
                }

            } else {
                if (!this.moving) {
                    this.move = setInterval(function() {
                        if (self.vibrationSelection > 0) {
                            self.vibrationSelection--;
                            self.proportionalSelection = Math.max(self.proportionalSelection-1, 0);
                        }
                        Controllers.Music.setVolume(self.vibrationSelection/30);
                    }, 500);
                    this.moving = true;
                }
            }
        }
    },

    release: function() {
        clearInterval(this.move);
        this.moving = false;
        this.clickMotion = false;
    },

    redraw: function() {
        this.$el.toggle(Controllers.Music.isPlaying());
    }

});