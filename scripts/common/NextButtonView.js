var NextButtonView = ButtonView.extend({
    initialize: function(options) {
        ButtonView.prototype.initialize.apply(this, [_.extend({icon: '', eventCatcher: '#nextButtonZoneEventCatcher'}, options)]);
        if (Music.isPlaying()) {
            this.icon = '#nextIcon';
        }
    },

    onClose: function() {
        $(this.eventCatcher).off('.' + this.cid);
        Music.getVent().off(null, null, this);
    },

    onShow: function() {
        var self = this;
        $(this.eventCatcher)
            .on('touchstart.' + this.cid, function() {
                if (Music.isPlaying()) {
                    self.timeout = setTimeout(function() {
                        if (Music.getTrack()) {
                            Music.getTrack().element.playbackRate = 3;
                        }
                    }, 1000);
                    self.holding = true;
                }
            })
            .on('touchend.' + this.cid, function() {
                clearTimeout(self.timeout);
                var currentTrack = Music.getTrack();
                if (Music.isPlaying() && currentTrack && self.holding) {
                    self.holding = false;
                    if (currentTrack.element.playbackRate > 1) {
                        currentTrack.element.playbackRate = 1;
                    } else {
                        Music.next();
                    }
                }
            });

        Music.getVent()
            .on('playing', function() {
                self.icon = '#nextIcon';
                self.render();
            }, this)
            .on('ended ', function() {
                self.icon = '';
                self.holding = false;
                self.render();
            }, this);

    }
});