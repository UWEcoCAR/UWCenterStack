var BackButtonView = ButtonView.extend({
    initialize: function(options) {
        ButtonView.prototype.initialize.apply(this, [_.extend({icon: '#backIcon', eventCatcher: '#backButtonZoneEventCatcher'}, options)]);
    },

    onClose: function() {
        $(this.eventCatcher).off("." + this.cid);
    },

    onShow: function() {
        $(this.eventCatcher).on('click.' + this.cid, (_.bind(function() {
            var parts = Backbone.history.fragment.split('/');
            if (parts.length <= 1) {
                Backbone.history.navigate('', { trigger: true });
            } else {
                parts.pop();
                Backbone.history.navigate(parts.join('/'), { trigger: true });
            }
        }, this)));
    }
});