var CurrentTrackView = Backbone.Marionette.ItemView.extend({
    template: '#currentTrackTemplate',

    initialize: function(options) {
        this.model.on('change', function() {
            this.render();
        }, this);
    },

    onClose: function() {
        this.model.off(null, null, this);
    }
});
