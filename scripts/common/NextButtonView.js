var NextButtonView = ButtonView.extend({
    initialize: function(options) {
        ButtonView.prototype.initialize.apply(this, [_.extend({icon: '#nextIcon', eventCatcher: '#nextButtonZoneEventCatcher'}, options)]);
    },

    onClose: function() {
        $(this.eventCatcher).off("." + this.cid);
    },

    onShow: function() {
        $(this.eventCatcher).on('click.' + this.cid, (_.bind(function() {
            if(currentTrack.get('currentState')) {
                Music.next();
            }
        }, this)));
    }
});