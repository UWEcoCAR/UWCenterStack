var id3 = require('id3js');
var FileFinder = require('../util/FileFinder');

// constructor
var tree = module.exports = function(directory, onReady) {
    this._directory = directory;
    this.tree = {
        tracks: new window.TrackCollection(),
        albums: new window.AlbumCollection(),
        artists: new window.ArtistCollection(),
        playlists: new window.PlaylistCollection()
    };

    this._init(onReady);
};

// called to initialize the build process
tree.prototype._init = function(callback) {
    var self = this;
    FileFinder.find(this._directory, 'mp3', function(err, results) {
        if (err) {
            callback(err);
        } else {
            self._getSongData(results, function(err, results) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, self._buildTree(results));
                }
            });
        }
    });
};

// given an array of filepaths, gets id3 data from each one
tree.prototype._getSongData = function(songs, callback) {
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
tree.prototype._buildTree = function(songObjects) {
    var tree = this.tree;

    var playlistNames = ['Road Trip', 'Favorites', 'Study Music', 'Gym Tunes'];
    _.each(playlistNames, function(playlistName, index) {
        tree.playlists.add(new window.PlaylistModel({id: index, name: playlistName, tracks: new window.TrackCollection()}));
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
        tree.tracks.add(track);

        var album = tree.albums.findWhere({name: track.get('albumName')});
        if (!album) {
            album = new window.AlbumModel({
                name: track.get('albumName'),
                artistName: track.get('artistName')
            });
            tree.albums.add(album);
        }
        album.tracks.add(track);

        var artist = tree.artists.findWhere({name: track.get('artistName')});
        if (!artist) {
            artist = new window.ArtistModel({
                name: track.get('artistName')
            });
            tree.artists.add(artist);
        }
        if (!artist.albums.findWhere({name: album.get('name')})) {
            artist.albums.add(album);
        }
        artist.tracks.add(track);

        var playlist = tree.playlists.get(Math.floor(Math.random() * playlistNames.length));
        if (!playlist.artists.findWhere({name: artist.get('name')})) {
            playlist.artists.add(artist);
        }
        if (!playlist.albums.findWhere({name: album.get('name')})) {
            playlist.albums.add(album);
        }
        playlist.tracks.add(track);
    });
    return this.tree;
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