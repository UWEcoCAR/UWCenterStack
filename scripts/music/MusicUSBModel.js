MusicUSBModel = Backbone.Model.extend({
    defaults: {
        artists: null,
        artistSelection: 0,
        artistInformation: null,
        albums: null,
        albumSelection: 0,
        albumInformation: null,
        tracks: null,
        trackSelection: 0,
        trackInformation: null,
        playlists: null,
        playlistSelection: 0,
        playListInformation: null
    }
});