var PreviousButtonView = ButtonView.extend({
    initialize: function(options) {
        ButtonView.prototype.initialize.apply(this, [_.extend({icon: '', eventCatcher: '#playPauseButtonZoneEventCatcher'}, options)]);
        this.updateIcon();
    },

    onClose: function() {
        $(this.eventCatcher).off("." + this.cid);
    },

    updateIcon: function() {
        if(currentTrack.get('isPlaying')) {
            this.icon = '#nextIcon';
        }
    },

    onShow: function() {
        var self = this;
        $(this.eventCatcher).on('click.' + this.cid, (_.bind(function() {
            if(currentTrack.get('isPlaying')) {
                Music.previous();
            }
        }, this)));
    }
});