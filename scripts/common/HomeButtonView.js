HomeButtonView = ButtonView.extend({
    initialize: function(options) {
        ButtonView.prototype.initialize.apply(this, [_.extend({icon: '#homeIcon', eventCatcher: '#homeButtonZoneEventCatcher'}, options)]);
        $(this.eventCatcher).click(_.bind(function() {
            Backbone.history.navigate('', { trigger: true });
        }, this));
    },

    onClose: function() {
        $(this.eventCatcher).off("." + this.cid);
    },

    onShow: function() {
        $(this.eventCatcher).on('click.' + this.cid, (_.bind(function() {
            Backbone.history.navigate('', { trigger: true });
        }, this)));
    }
});