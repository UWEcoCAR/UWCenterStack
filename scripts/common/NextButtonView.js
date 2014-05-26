var NextButtonView = ButtonView.extend({
    initialize: function(options) {
        ButtonView.prototype.initialize.apply(this, [_.extend({icon: '', eventCatcher: '#nextButtonZoneEventCatcher'}, options)]);
        if (Controllers.Music.isPlaying()) {
            this.icon = '#nextIcon';
        }
    },

    onClose: function() {
        $(this.eventCatcher).off('.' + this.cid);
    },

    onShow: function() {
        var self = this;
        $(this.eventCatcher)
            .on('touchstart. mousedown.' + this.cid, function() {
                if (Controllers.Music.isPlaying()) {
                    self.timeout = setTimeout(function() {
                        if (Controllers.Music.getTrack()) {
                            Controllers.Music.getTrack().element.playbackRate = 3;
                        }
                    }, 1000);
                    self.holding = true;
                }
            })
            .on('touchend. mouseup.' + this.cid, function() {
                clearTimeout(self.timeout);
                var currentTrack = Controllers.Music.getTrack();
                if (Controllers.Music.isPlaying() && currentTrack && self.holding) {
                    self.holding = false;
                    if (currentTrack.element.playbackRate > 1) {
                        currentTrack.element.playbackRate = 1;
                    } else {
                        Controllers.Music.next();
                    }
                }
            });

        this.listenTo(Controllers.Music, 'start stop', function() {
            Controllers.Music.isPlaying() ? this.icon = '#nextIcon' : this.icon = '';
            this.render();
        });
        this.listenTo(Controllers.Music, 'ended', function() {
            this.holding = false;
        });
    }
});