var CurrentTrackView = Backbone.Marionette.ItemView.extend({
    template: '#currentTrackTemplate',
    
    onClose: function() {
        this.model.off(null, null, this);
    },

    onShow: function() {
    	this.model.on('change', function() {
            this.render();
        }, this);
    }
});
