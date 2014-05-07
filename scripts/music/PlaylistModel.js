var PlaylistModel = Backbone.Model.extend({
    initialize: function(options) {
        this.tracks = new window.TrackCollection();
    }
});