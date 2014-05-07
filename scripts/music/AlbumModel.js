var AlbumModel = Backbone.Model.extend({
    initialize: function(options) {
        this.tracks = new window.TrackCollection();
        this.tracks.comparator = function(track) {
            return track.get('trackNumber');
        };
    }
});