MusicUSBModel = Backbone.Model.extend({
    defaults: {
        artist: '',
        artists: null,
        artistSelection: 0,
        artistInformation: null,
        album: '',
        albums: null,
        albumSelection: 0,
        tracks: null,
        trackSelection: 0,
        playlist: '',
        playlists: null,
        playlistSelection: 0,
        playlistInformation: null
    }
});