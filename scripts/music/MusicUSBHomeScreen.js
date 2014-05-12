/**
 * View for music home screen
 */
MusicUSBHomeScreen = ScreenLayout.extend({

    initialize: function() {

        window.model = this.model = new MusicUSBModel();
        
        // back/home button defaults
        this.backgroundIconView = new BackgroundIconView({icon: '#iPodIcon'});
        this.backButtonView = new BackButtonView();
        this.homeButtonView = new HomeButtonView();

        this.vent = _.extend({}, Backbone.Events);

        this.playPauseButtonView = new PreviousButtonView();
        this.nextButtonView = new NextButtonView();
        
        // volume slider
        this.volumeSliderView = new VolumeSliderView();

        this.inputZone1View = new SliderView({
            eventId: 'inputZone1',
            iconLeft: '#playlistIcon',
            eventCatcher: '#inputZone1EventCatcher',
            viewId: '',
            vent: this.vent
        });

        this.inputZone2View = new SliderView({
            eventId: 'inputZone2',
            iconLeft: '#artistIcon',
            eventCatcher: "#inputZone2EventCatcher",
            viewId: '',
            vent: this.vent
        });

        this.inputZone3View = new SliderView({
            eventId: 'inputZone3',
            iconLeft: '#albumIcon',
            eventCatcher: "#inputZone3EventCatcher",
            viewId: '',
            vent: this.vent
        });

        this.inputZone4View = new SliderView({
            eventId: 'inputZone4',
            iconLeft: '#songIcon',
            eventCatcher: "#inputZone4EventCatcher",
            viewId: '',
            vent: this.vent
        });

        this.inputZone5View = new SliderView({
            eventId: 'inputZone4',
            viewId: ''
        });

        // default main zone view of musicUSB home
        this.renderedMainZoneView = this.mainZoneView = new MusicUSBMainZone({ model: this.model });

        MusicTree.getVent().on('loading loaded', function() {
            this.render();
        }, this);

    },

    onRender: function() {

        if (MusicTree.isLoading()) {
            return;
        }

        this.renderedMainZoneView ? this.mainZoneContent.show(this.renderedMainZoneView) : this.mainZoneContent.close();
        this.backgroundIconContent.show(this.backgroundIconView);
        this.backButtonZoneContent.show(this.backButtonView);
        this.homeButtonZoneContent.show(this.homeButtonView);
        this.playPauseButtonZoneContent.show(this.playPauseButtonView);
        this.nextButtonZoneContent.show(this.nextButtonView);
        this.volumeSliderZoneContent.show(this.volumeSliderView);

        this.inputZone1Content.show(this.inputZone1View);
        this.inputZone2Content.show(this.inputZone2View);
        this.inputZone3Content.show(this.inputZone3View);
        this.inputZone4Content.show(this.inputZone4View);
        this.inputZone5Content.show(this.inputZone5View);
        
    },

    onBeforeClose: function() {
        this.vent.off();
    },

    onShow: function() {
        var self = this;

        if (this.model.get('tracks') === null) {
            self.resetModel();
        }

        // collection and view of tracks
        var trackCollection = new Backbone.Collection([]);
        var windowSize = Math.min(self.model.get('tracks').length, 25);
        var trackListView = new WindowListView({
            eventId: 'trackList',
            eventSource: 'inputZone4',
            collection: trackCollection,
            viewId: '',
            vent: this.vent,
            numLevels: self.model.get('tracks').length,
            windowSize: windowSize,
            windowStart: 0,
            windowSpeed: 25,
            selection: self.model.get('trackSelection')
        });

        MusicTree.tracks.forEach(function(track) {
            trackCollection.push({text: track.get('name')});
        });

        // collection and view of artists
        var artistCollection = new Backbone.Collection([]);
        windowSize = Math.min(self.model.get('artists').length+1, 25);
        var artistListView = new WindowListView({
            eventId: 'artistList',
            eventSource: 'inputZone2',
            collection: artistCollection,
            viewId: '',
            vent: this.vent,
            numLevels: self.model.get('artists').length+1,
            windowSize: windowSize,
            windowStart: 0,
            windowSpeed: 25,
            selection: 0
        });

        artistCollection.push({text: 'All Artists'});
        MusicTree.artists.forEach(function(artist) {
            artistCollection.push({text: artist.get('name')});
        });
        if (self.model.get('artist') !== null) {
            artistListView.selection = self.model.get('artistSelection');
        }

        // collection and view of tracks
        var albumCollection = new Backbone.Collection([]);
        windowSize = Math.min(self.model.get('albums').length+1, 25);
        var albumListView = new WindowListView({
            eventId: 'albumList',
            eventSource: 'inputZone3',
            collection: albumCollection,
            viewId: '',
            vent: this.vent,
            numLevels: self.model.get('albums').length+1,
            windowSize: windowSize,
            windowStart: 0,
            windowSpeed: 25,
            selection: 0
        });

        albumCollection.push({text: 'All Albums'});
        MusicTree.albums.forEach(function(album) {
            albumCollection.push({text: album.get('name')});
        });

        // collection and view of tracks
        var playListCollection = new Backbone.Collection([]);
        windowSize = Math.min(self.model.get('playlists').length+1, 25);
        var playListView = new WindowListView({
            eventId: 'playList',
            eventSource: 'inputZone1',
            collection: playListCollection,
            viewId: '',
            vent: this.vent,
            numLevels: self.model.get('playlists').length+1,
            windowSize: windowSize,
            windowStart: 0,
            windowSpeed: 25,
            selection: 0
        });

        playListCollection.push({text: 'All Playlists'});
        MusicTree.playlists.forEach(function(playlist) {
            playListCollection.push({text: playlist.get('name')});
        });

        // starting to slide the sliders
        this.vent.on('inputZone1:touchStart', function() {
            self.renderedMainZoneView = playListView;
            self.backgroundIconView = new BackgroundIconView({icon: '#playlistIcon'});
            self.render();
        }, this);

        // starting to slide the sliders
        this.vent.on('inputZone2:touchStart', function() {
            self.resetCollection(artistCollection, self.model.get('artists'), 2);
            self.renderedMainZoneView = artistListView;
            self.backgroundIconView = new BackgroundIconView({icon: '#artistIcon'});
            self.render();
        }, this);

        this.vent.on('inputZone3:touchStart', function() {
            self.resetCollection(albumCollection, self.model.get('albums'), 3);
            self.renderedMainZoneView = albumListView;
            self.backgroundIconView = new BackgroundIconView({icon: '#albumIcon'});
            self.render();
        }, this);

        this.vent.on('inputZone4:touchStart', function() {
            self.resetCollection(trackCollection, self.model.get('tracks'), 4);
            self.renderedMainZoneView = trackListView;
            self.backgroundIconView = new BackgroundIconView({icon: '#songIcon'});
            self.render();
        }, this);

        // updatie main view back to default music USB
        this.vent.on('inputZone1:touchEnd inputZone2:touchEnd inputZone3:touchEnd inputZone4:touchEnd', function() {
            self.renderedMainZoneView = self.mainZoneView;
            self.backgroundIconView = new BackgroundIconView({icon: '#musicIcon'});
            self.render();
        }, this);

        this.vent.on('trackList:select ', function(data, selection) {
            self.model.set('trackSelection', selection);

            var qs = new QueueSupplier(self.model.get('tracks'));
            for (var z = 0; z < selection; z++) {
                qs.next();
            }
            Music.setSupplier(qs);
            Music.start();

            self.resetModel();
            //self.resetCollection(trackCollection, MusicTree.tracks.models, 4);
            self.resetView(trackListView, MusicTree.tracks.models.length);
            //self.resetCollection(albumCollection, MusicTree.albums.models, 3);
            self.resetView(albumListView, MusicTree.albums.models.length + 1);
            //self.resetCollection(artistCollection, MusicTree.artists.models, 2);
            self.resetView(artistListView, MusicTree.artists.models.length + 1);

            playListView.windowStart = 0;
            playListView.selection = 0;
            self.model.set('playListSelection', 0);

            self.render();
        }, this);

        this.vent.on('albumList:select ', function(data, selection) {
            self.model.set('albumSelection', selection);

            var dataForTracks = null;
            if (selection === 0) {
                if (self.model.get('artistInformation') !== null) {
                    dataForTracks = self.model.get('artistInformation').tracks.models;
                } else if (self.model.get('playListInformation') !== null) {
                    dataForTracks = self.model.get('playListInformation').tracks.models;
                } else {
                    dataForTracks = MusicTree.tracks.models;                  
                }
            } else {
                var dataForAlbum = null;
                if (self.model.get('artistInformation') !== null) {
                    dataForAlbum = self.model.get('artistInformation').albums.find(function(album) {
                        return _.equal(album.get('name'), data.model.get('text'));
                    });
                } else if (self.model.get('playListInformation') !== null) {
                    dataForAlbum = self.model.get('playListInformation').albums.find(function(album) {
                        return _.equal(album.get('name'), data.model.get('text'));
                    });
                } else {
                    dataForAlbum = MusicTree.albums.find(function(album) {
                        return _.equal(album.get('name'), data.model.get('text'));
                    });
                }
                dataForTracks = dataForAlbum.tracks.models;
            }

            self.model.set('tracks', dataForTracks);
            self.model.set('trackSelection', 0);
            //self.resetCollection(trackCollection, dataForTracks, 4);
            self.resetView(trackListView, dataForTracks.length);

        }, this);

        this.vent.on('playList:select ', function(data, selection) {
            self.model.set('playListSelection', selection);

            var dataForArtists = null;
            var dataForAlbums = null;
            var dataForTracks = null;
            var dataForPlayList = null;

            if (selection === 0) {
                dataForArtists = MusicTree.artists.models;
                dataForAlbums = MusicTree.albums.models;
                dataForTracks = MusicTree.tracks.models;
            } else {
                dataForPlayList = MusicTree.playlists.find(function(playlist) {
                    return _.equal(playlist.get('name'), data.model.get('text'));
                });
                dataForArtists = dataForPlayList.artists.models;
                dataForAlbums = dataForPlayList.albums.models;
                dataForTracks = dataForPlayList.tracks.models;   
            }

            self.model.set('artists', dataForArtists);
            self.model.set('artistSelection', 0);
            //self.resetCollection(artistCollection, dataForArtists, 2);
            self.resetView(artistListView, dataForArtists.length + 1);

            self.model.set('albums', dataForAlbums);
            self.model.set('albumSelection', 0);
            //self.resetCollection(albumCollection, dataForAlbums, 3);
            self.resetView(albumListView, dataForAlbums.length + 1);

            self.model.set('tracks', dataForTracks);
            self.model.set('trackSelection', 0);
            //self.resetCollection(trackCollection, dataForTracks, 4);
            self.resetView(trackListView, dataForTracks.length);

            self.model.set('playListInformation', dataForPlayList);

        }, this);


        this.vent.on('artistList:select ', function(data, selection) {
            self.model.set('artistSelection', selection);

            var dataForAlbums = null;
            var dataForTracks = null;
            var dataForArtist = null;

            if (selection === 0) {
                if (self.model.get('playListInformation') !== null) {
                    dataForAlbums = self.model.get('playListInformation').albums.models;
                    dataForTracks = self.model.get('playListInformation').tracks.models;
                } else {
                    dataForAlbums = MusicTree.albums.models;
                    dataForTracks = MusicTree.tracks.models;
                }
            } else {
                if (self.model.get('playListInformation') !== null) {
                    dataForArtist = self.model.get('playListInformation').artists.find(function(artist) {
                        return _.equal(artist.get('name'), data.model.get('text'));
                    });
                } else {
                    dataForArtist = MusicTree.artists.find(function(artist) {
                        return _.equal(artist.get('name'), data.model.get('text'));
                    });
                }
                dataForAlbums = dataForArtist.albums.models;
                dataForTracks = dataForArtist.tracks.models;
            }

            self.model.set('albums', dataForAlbums);
            self.model.set('albumSelection', 0);
            //self.resetCollection(albumCollection, dataForAlbums, 3);
            self.resetView(albumListView, dataForAlbums.length + 1);

            self.model.set('tracks', dataForTracks);
            self.model.set('trackSelection', 0);
            //self.resetCollection(trackCollection, dataForTracks, 4);
            self.resetView(trackListView, dataForTracks.length);

            self.model.set('artistInformation', dataForArtist);

        }, this);

    },

    resetModel: function() {
        this.model.set('tracks', MusicTree.tracks.models);
        this.model.set('trackSelection', 0);
        this.model.set('albums', MusicTree.albums.models);
        this.model.set('albumSelection', 0);
        this.model.set('artists', MusicTree.artists.models);
        this.model.set('artistSelection', 0);
        this.model.set('artistInformation', null);
        this.model.set('playlists', MusicTree.playlists.models);
        this.model.set('playlistSelection', 0);
        this.model.set('playListInformation', null);
    },

    resetCollection: function(collection, data, allOption) {
        collection.reset();
        var length = data.length;
        if (allOption == 2) {
            collection.push({text: 'All Artists'});
            length++;
        } else if (allOption == 3) {
            collection.push({text: 'All Albums'});
            length++;
        }
        for (var j = 0; j < data.length; j++) {
            collection.push({text: data[j].get('name')});
        }
        
       /* view.numLevels = length;
        view.windowSize = Math.min(length, 25);
        view.windowStart = 0;
        view.selection = 0;*/
    },

    resetView: function(view, length) {

        view.numLevels = length;
        view.windowSize = Math.min(length, 25);
        view.windowStart = 0;
        view.selection = 0;
    }
});



