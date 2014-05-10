var PlaylistModel = Backbone.Model.extend({
    initialize: function(options) {
        this.artists = new window.ArtistCollection();
        this.albums = new window.AlbumCollection();
        this.tracks = new window.TrackCollection();
    }
});