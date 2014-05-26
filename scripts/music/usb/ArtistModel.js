var ArtistModel = Backbone.Model.extend({
    initialize: function(options) {
        this.albums = new window.AlbumCollection();
        this.tracks = new window.TrackCollection();
    }
});