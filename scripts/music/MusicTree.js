var id3 = require('id3js');
var FileFinder = require('../util/FileFinder');

// constructor
var MusicTree = module.exports = function() {
    this.tracks = new window.TrackCollection();
    this.albums = new window.AlbumCollection();
    this.artists = new window.ArtistCollection();
    this.playlists = new window.PlaylistCollection();
    this.loading = false;
    this.vent = _.extend({}, Backbone.Events);
};

MusicTree.prototype.getVent = function() {
    return this.vent;
};

MusicTree.prototype.isLoading = function() {
    return this.loading;
};

MusicTree.prototype.empty = function() {
    this.tracks = new window.TrackCollection();
    this.albums = new window.AlbumCollection();
    this.artists = new window.ArtistCollection();
    this.playlists = new window.PlaylistCollection();
    this.vent.trigger('emptied');
};

// called to initialize the build process
MusicTree.prototype.load = function(directory) {
    var self = this;
    this.loading = true;
    this.vent.trigger('loading');
    FileFinder.find(directory, 'mp3', _.bind(function(err, results) {
        if (err) throw err;
        this._getSongData(results, _.bind(function(err, results) {
            if (err) throw err;
            this._buildTree(results);
            this.loading = false;
            this.vent.trigger('loaded');
        },this));
    }, this));
};

// given an array of filepaths, gets id3 data from each one
MusicTree.prototype._getSongData = function(songs, callback) {
    doneFn = _.after(songs.length, callback);
    songs.forEach(function(song, index) {
        id3({
            file : song,
            type : id3.OPEN_LOCAL
        }, function(err, tags) {
            if (err) {
                callback(err);
                return;
            }
            songs[index] = {
                src : song,
                data : tags
            };
            doneFn(null, songs);
        });
    });
};

// builds the artist-album-song tree
MusicTree.prototype._buildTree = function(songObjects) {
    var self = this;

    this.tracks.reset();
    this.albums.reset();
    this.artists.reset();
    this.playlists.reset();

    var playlistNames = ['Road Trip', 'Favorites', 'Study Music', 'Gym Tunes'];
    _.each(playlistNames, function(playlistName, index) {
        self.playlists.add(new window.PlaylistModel({id: index, name: playlistName, tracks: new window.TrackCollection()}));
    });

    songObjects.forEach(function(trackObject, index) {
        var track = new window.TrackModel({
            // http://stackoverflow.com/questions/9429234/convert-base64-string-to-image-with-javascript
            image: '<img src="data:' + trackObject.data.v2.image.mime + ';base64,' + _arrayBufferToBase64(trackObject.data.v2.image.data) + '" />',
            src: trackObject.src,
            name: trackObject.data.v2.title,
            albumName: trackObject.data.v2.album,
            artistName: trackObject.data.v2.artist,
            trackNumber: trackObject.data.v2.track.indexOf('/') !== -1 ? trackObject.data.v2.track.substring(0, trackObject.data.v2.track.indexOf('/')) : trackObject.data.v2.track
        });
        self.tracks.add(track);


        var album = self.albums.findWhere({name: track.get('albumName')});
        if (!album) {
            album = new window.AlbumModel({
                name: track.get('albumName'),
                artistName: track.get('artistName')
            });
            self.albums.add(album);
        }
        album.tracks.add(track);

        var artist = self.artists.findWhere({name: track.get('artistName')});
        if (!artist) {
            artist = new window.ArtistModel({
                name: track.get('artistName')
            });
            self.artists.add(artist);
        }
        if (!artist.albums.findWhere({name: album.get('name')})) {
            artist.albums.add(album);
        }
        artist.tracks.add(track);

        var playlist = self.playlists.get(Math.floor(Math.random() * playlistNames.length));
        if (!playlist.artists.findWhere({name: artist.get('name')})) {
            playlist.artists.add(artist);
        }
        if (!playlist.albums.findWhere({name: album.get('name')})) {
            playlist.albums.add(album);
        }
        playlist.tracks.add(track);
    });
};

function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[ i ]);
    }
    return window.btoa(binary);
}
