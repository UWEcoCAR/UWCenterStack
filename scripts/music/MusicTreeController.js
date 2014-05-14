var id3 = require('id3js');
var FileFinder = require('../util/FileFinder');

// constructor
var MusicTree = module.exports = Marionette.Controller.extend({
    initialize: function() {
        this.tracks = new window.TrackCollection();
        this.albums = new window.AlbumCollection();
        this.artists = new window.ArtistCollection();
        this.playlists = new window.PlaylistCollection();
        this.loading = false;
    },

    isLoading: function() {
        return this.loading;
    },

    empty: function() {
        this.tracks = new window.TrackCollection();
        this.albums = new window.AlbumCollection();
        this.artists = new window.ArtistCollection();
        this.playlists = new window.PlaylistCollection();
        this.trigger('emptied');
    },

    load: function(directory) {
        this.loading = true;
        this.trigger('loading');
        FileFinder.find(directory, 'mp3', _.bind(function(err, results) {
            if (err) throw err;
            this._getSongData(results, _.bind(function(err, results) {
                if (err) throw err;
                this._buildTree(results);
                this.loading = false;
                this.trigger('loaded');
            },this));
        }, this));
    },

    _getSongData: function(songs, callback) {
        var doneFn = _.after(songs.length, callback);
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
    },

    _buildTree: function(songObjects) {
        this.tracks.reset();
        this.albums.reset();
        this.artists.reset();
        this.playlists.reset();

        var playlistNames = ['Road Trip', 'Favorites', 'Study Music', 'Gym Tunes'];
        _.each(playlistNames, _.bind(function(playlistName, index) {
            this.playlists.add(new window.PlaylistModel({id: index, name: playlistName, tracks: new window.TrackCollection()}));
        }, this));

        songObjects.forEach(_.bind(function(trackObject, index) {
            var track = new window.TrackModel({
                // http://stackoverflow.com/questions/9429234/convert-base64-string-to-image-with-javascript
                image: '<img src="data:' + trackObject.data.v2.image.mime + ';base64,' + this._arrayBufferToBase64(trackObject.data.v2.image.data) + '" />',
                src: trackObject.src,
                name: trackObject.data.v2.title,
                albumName: trackObject.data.v2.album,
                artistName: trackObject.data.v2.artist,
                trackNumber: trackObject.data.v2.track.indexOf('/') !== -1 ? trackObject.data.v2.track.substring(0, trackObject.data.v2.track.indexOf('/')) : trackObject.data.v2.track
            });
            this.tracks.add(track);


            var album = this.albums.findWhere({name: track.get('albumName')});
            if (!album) {
                album = new window.AlbumModel({
                    name: track.get('albumName'),
                    artistName: track.get('artistName')
                });
                this.albums.add(album);
            }
            album.tracks.add(track);

            var artist = this.artists.findWhere({name: track.get('artistName')});
            if (!artist) {
                artist = new window.ArtistModel({
                    name: track.get('artistName')
                });
                this.artists.add(artist);
            }
            if (!artist.albums.findWhere({name: album.get('name')})) {
                artist.albums.add(album);
            }
            artist.tracks.add(track);

            var playlist = this.playlists.get(Math.floor(Math.random() * playlistNames.length));
            if (!playlist.artists.findWhere({name: artist.get('name')})) {
                playlist.artists.add(artist);
            }
            if (!playlist.albums.findWhere({name: album.get('name')})) {
                playlist.albums.add(album);
            }
            playlist.tracks.add(track);
        }, this));
    },

    _arrayBufferToBase64: function(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[ i ]);
        }
        return window.btoa(binary);
    }
});
