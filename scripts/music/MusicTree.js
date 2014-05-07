var id3 = require('id3js');
var FileFinder = require('../util/FileFinder');

// constructor
var tree = module.exports = function(directory, onReady) {
    this._directory = directory;
    this.tree = {
        tracks: new window.TrackCollection(),
        albums: new window.AlbumCollection(),
        artists: new window.ArtistCollection()
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
    songObjects.forEach(function(trackObject, index) {
        var track = new window.TrackModel({
            id: index,
            imageMime: trackObject.data.v2.image.mime,
            imageData: trackObject.data.v2.image.data,
            src: trackObject.src,
            name: trackObject.data.v2.track,
            albumName: trackObject.data.v2.album,
            artistName: trackObject.data.v2.artist,
            track: trackObject.data.v2.track
        });
        tree.tracks.push(track);

        var album = tree.albums.findWhere({name: track.get('albumName')});
        if (!album) {
            album = new window.AlbumModel({
                id: tree.albums.length,
                tracks: new window.TrackCollection(),
                name: track.get('albumName'),
                artistName: track.get('artistName')
            });
            tree.albums.push(album);
        }
        album.get('tracks').push(track);

        var artist = tree.artists.findWhere({name: track.get('artistName')});
        if (!artist) {
            artist = new window.ArtistModel({
                id: tree.artists.length,
                tracks: new window.TrackCollection(),
                albums: new window.AlbumCollection(),
                name: track.get('artistName')
            });
            tree.artists.push(artist);
        }
        if (!artist.get('albums').findWhere({name: album.get('name')})) {
            artist.get('albums').push(album);
        }
        artist.get('tracks').push(track);

    });
    return this.tree;
};