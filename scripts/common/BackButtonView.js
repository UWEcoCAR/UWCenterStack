var BackButtonView = ButtonView.extend({
    initialize: function(options) {
        ButtonView.prototype.initialize.apply(this, [_.extend({icon: '#backIcon', eventCatcher: '#backButtonZoneEventCatcher'}, options)]);
    },

    onClose: function() {
        $(this.eventCatcher).off("." + this.cid);
    },

    onShow: function() {
        $(this.eventCatcher).on('click.' + this.cid, function() {
            window.history.back();
        });
    }
});