/**
 * View for music home screen
 */
MusicUSBHomeScreen = ScreenLayout.extend({

    initialize: function() {
       // console.log(this.vent);
        window.model = this.model;
        
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
            iconLeft: '#artistIcon',
            eventCatcher: '#inputZone1EventCatcher',
            viewId: '',
            vent: this.vent
        });

        this.inputZone2View = new SliderView({
            eventId: 'inputZone2',
            iconLeft: '#songIcon',
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
            iconLeft: '#playlistIcon',
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

    },

    onRender: function() {
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
            this.model.set('tracks', musicTree.tree.tracks.models);
            this.model.set('trackSelection', 0);
        }

        // collection and view of tracks
        var trackCollection = new Backbone.Collection([]);
        var windowSize = Math.min(self.model.get('tracks').length, 25);
        var trackListView = new WindowListView({
            eventId: 'trackList',
            eventSource: 'inputZone2',
            collection: trackCollection,
            viewId: '',
            vent: this.vent,
            numLevels: windowSize,
            windowSize: windowSize,
            windowStart: 0,
            windowSpeed: 25,
            selection: self.model.get('trackSelection')
        });
 
        for (var i = 0; i < self.model.get('tracks').length; i++) {
            trackCollection.push({text: self.model.get('tracks')[i].get('name')});
        }

        // collection and view of artists
        var artistCollection = new Backbone.Collection([]);
        var artistListView = new WindowListView({
            eventId: 'artistList',
            eventSource: 'inputZone1',
            collection: artistCollection,
            viewId: '',
            vent: this.vent,
            numLevels: 4,
            windowSize: 4,
            windowStart: 0,
            windowSpeed: 25,
            selection: 0
        });
        for (var j = 0; j < 4; j++) {
            artistCollection.push({text: musicTree.tree.artists.models[j].get('name')});
        }
        if (self.model.get('artist') !== null) {
            artistListView.selection = self.model.get('artistSelection');
        }

        // collection and view of tracks
        var albumCollection = new Backbone.Collection([]);
        var albumListView = new WindowListView({
            eventId: 'albumList',
            eventSource: 'inputZone3',
            collection: albumCollection,
            viewId: '',
            vent: this.vent,
            numLevels: 12,
            windowSize: 12,
            windowStart: 0,
            windowSpeed: 25,
            selection: 0
        });
        for (var k = 0; k < 12; k++) {
            albumCollection.push({text: musicTree.tree.albums.models[k].get('name')});
        }

        // collection and view of tracks
        var playListCollection = new Backbone.Collection([]);
        var playListView = new WindowListView({
            eventId: 'playList',
            eventSource: 'inputZone4',
            collection: playListCollection,
            viewId: '',
            vent: this.vent,
            numLevels: 4,
            windowSize: 4,
            windowStart: 0,
            windowSpeed: 25,
            selection: 0
        });
        for (var w = 0; w < 4; w++) {
            playListCollection.push({text: musicTree.tree.playlists.models[w].get('name')});
        }

        // starting to slide the sliders
        this.vent.on('inputZone1:touchStart', function() {
            self.renderedMainZoneView = artistListView;
            self.backgroundIconView = new BackgroundIconView({icon: '#artistIcon'});
            self.render();
        }, this);

        // starting to slide the sliders
        this.vent.on('inputZone2:touchStart', function() {
            self.renderedMainZoneView = trackListView;
            self.backgroundIconView = new BackgroundIconView({icon: '#songIcon'});
            self.render();
        }, this);

        this.vent.on('inputZone3:touchStart', function() {
            self.renderedMainZoneView = albumListView;
            self.backgroundIconView = new BackgroundIconView({icon: '#albumIcon'});
            self.render();
        }, this);

        this.vent.on('inputZone4:touchStart', function() {
            self.renderedMainZoneView = playListView;
            self.backgroundIconView = new BackgroundIconView({icon: '#playlistIcon'});
            self.render();
        }, this);

        // updatie main view back to default music USB
        this.vent.on('inputZone1:touchEnd inputZone2:touchEnd inputZone3:touchEnd inputZone4:touchEnd', function() {
            self.renderedMainZoneView = self.mainZoneView;
            self.backgroundIconView = new BackgroundIconView({icon: '#musicIcon'});
            self.render();
        }, this);

        this.vent.on('trackList:select ', function(data, selection) {
            self.model.set('track', data.model.get('text'));
            self.model.set('trackSelection', selection);
            
            var qs = new QueueSupplier(self.model.get('tracks'));
            for (var z = 0; z < selection; z++) {
                qs.next();
            }
            Music.setSupplier(qs);
            Music.start();

            self.render();
        }, this);

        this.vent.on('albumList:select ', function(data, selection) {
            self.model.set('album', data.model.get('text'));
            self.model.set('albumSelection', selection);
             var dataForAlbum = musicTree.tree.albums.find(function(album) {
                return _.equal(album.get('name'), data.model.get('text'));
            });
            var windowSize = Math.min(dataForAlbum.tracks.length, 25);
            trackCollection.reset();
            for (var j = 0; j < dataForAlbum.tracks.length; j++) {
                trackCollection.push({text: dataForAlbum.tracks.models[j].get('name')});
            }
            self.model.set('tracks', dataForAlbum.tracks.models);
            var qs = new QueueSupplier(self.model.get('tracks'));
            Music.setSupplier(qs);
            Music.start();

            trackListView.numLevels = dataForAlbum.tracks.length;
            trackListView.windowSize = windowSize;
            trackListView.windowStart = 0;
            trackListView.selection = 0;
            self.model.set('trackSelection', 0);

            playListView.windowStart = 0;
            playListView.selection = 0;
            self.model.set('playListSelection', 0);
        }, this);

        this.vent.on('playList:select ', function(data, selection) {
            self.model.set('playList', data.model.get('text'));
            self.model.set('playListSelection', selection);
            
            var dataForPlayList = musicTree.tree.playlists.find(function(playlist) {
                return _.equal(playlist.get('name'), data.model.get('text'));
            });
            var windowSize = Math.min(dataForPlayList.tracks.length, 25);
            trackCollection.reset();

            for (var j = 0; j < dataForPlayList.tracks.length; j++) {
                trackCollection.push({text: dataForPlayList.tracks.models[j].get('name')});
            }
            self.model.set('tracks', dataForPlayList.tracks.models);
            var qs = new QueueSupplier(self.model.get('tracks'));
            Music.setSupplier(qs);
            Music.start();

            trackListView.numLevels = dataForPlayList.tracks.length;
            trackListView.windowSize = windowSize;
            trackListView.windowStart = 0;
            trackListView.selection = 0;
            self.model.set('track', null);
            self.model.set('trackSelection', 0);

            albumListView.windowStart = 0;
            albumListView.selection = 0;
            self.model.set('album', null);
            self.model.set('albumSelection', 0);

            artistListView.windowStart = 0;
            artistListView.selection = 0;
            self.model.set('artist', null);
            self.model.set('artistSelection', 0);

        }, this);


        this.vent.on('artistList:select ', function(data, selection) {
            self.model.set('artist', data.model.get('text'));
            self.model.set('artistSelection', selection);
            var dataForArtist = musicTree.tree.artists.find(function(artist) {
                return _.equal(artist.get('name'), data.model.get('text'));
            });

            var windowSize = Math.min(dataForArtist.albums.length, 25);
            albumCollection.reset();
            for (var i = 0; i < dataForArtist.albums.length; i++) {
                albumCollection.push({text: dataForArtist.albums.models[i].get('name')});
            }
            albumListView.numLevels = dataForArtist.albums.length;
            albumListView.windowSize = windowSize;
            albumListView.windowStart = 0;
            albumListView.selection = 0;
            self.model.set('album', null);
            self.model.set('albumSelection', 0);


            windowSize = Math.min(dataForArtist.tracks.length, 25);
            trackCollection.reset();
            for (var j = 0; j < dataForArtist.tracks.length; j++) {
                trackCollection.push({text: dataForArtist.tracks.models[j].get('name')});
            }
            self.model.set('tracks', dataForArtist.tracks.models);
            var qs = new QueueSupplier(self.model.get('tracks'));
            Music.setSupplier(qs);
            Music.start();

            trackListView.numLevels = dataForArtist.tracks.length;
            trackListView.windowSize = windowSize;
            trackListView.windowStart = 0;
            trackListView.selection = 0;
            self.model.set('track', null);
            self.model.set('trackSelection', 0);


            playListView.windowStart = 0;
            playListView.selection = 0;
            self.model.set('playList', null);
            self.model.set('playListSelection', 0);

        }, this);

    }
});



