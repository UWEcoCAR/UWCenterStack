var PreviousButtonView = ButtonView.extend({
    initialize: function(options) {
        ButtonView.prototype.initialize.apply(this, [_.extend({icon: '', eventCatcher: '#playPauseButtonZoneEventCatcher'}, options)]);
        if (Controllers.Music.isPlaying()) {
            this.icon = '#previousIcon';
        }
    },

    onClose: function() {
        $(this.eventCatcher).off('.' + this.cid);
    },

    onShow: function() {
        $(this.eventCatcher)
            .on('touchend. mouseup.' + this.cid, function() {
                if (Controllers.Music.isPlaying()) {
                    Controllers.Music.previous();
                }
            });

        this.listenTo(Controllers.Music, 'start stop', function() {
            Controllers.Music.isPlaying() ? this.icon = '#previousIcon' : this.icon = '';
            this.render();
        });
    }
});