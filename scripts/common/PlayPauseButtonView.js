var PlayPauseButtonView = ButtonView.extend({
    initialize: function(options) {
        var iconState = '#pauseIcon';
        if (!currentTrack.get('currentState') || currentTrack.get('currentState').localeCompare('pause')===0) {
            iconState = '#playIcon';           
        }
        ButtonView.prototype.initialize.apply(this, [_.extend({icon: iconState, eventCatcher: '#playPauseButtonZoneEventCatcher'}, options)]);
    },

    onClose: function() {
        $(this.eventCatcher).off("." + this.cid);
    },

    onShow: function() {
        $(this.eventCatcher).on('click.' + this.cid, (_.bind(function() {

            if (this.icon == '#playIcon') {
                this.icon = '#pauseIcon';
                Music.play();
            } else {
                this.icon = '#playIcon';
                Music.pause();
            }
            this.render();
        }, this)));
    }
});