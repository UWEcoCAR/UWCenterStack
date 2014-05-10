var PreviousButtonView = ButtonView.extend({
    initialize: function(options) {
        ButtonView.prototype.initialize.apply(this, [_.extend({icon: '', eventCatcher: '#playPauseButtonZoneEventCatcher'}, options)]);
        if (Music.isPlaying()) {
            this.icon = '#previousIcon';
        }
    },

    onClose: function() {
        $(this.eventCatcher).off('.' + this.cid);
        Music.getVent().off(null, null, this);
    },

    onShow: function() {
        var self = this;
        $(this.eventCatcher)
            .on('touchend.' + this.cid, function() {
                if (Music.isPlaying()) {
                    Music.previous();
                }
            });

        Music.getVent()
            .on('playing', function() {
                this.icon = '#previousIcon';
                this.render();
            }, this)
            .on('ended ', function() {
                this.icon = '';
                this.render();
            }, this);
    }
});