/**
 * View for music home screen
 */
MusicUSBHomeScreen = ScreenLayout.extend({

    initialize: function() {

        window.model = this.model;
        this.resetModel();
        
        // back/home button defaults
        this.backgroundIconView = new BackgroundIconView({icon: '#iPodIcon'});
        this.backButtonView = new BackButtonView();
        this.homeButtonView = new HomeButtonView();
        this.leapView = new LeapView();

        this.vent = _.extend({}, Backbone.Events);

        this.playPauseButtonView = new PreviousButtonView();
        this.nextButtonView = new NextButtonView();
        
        // volume slider
        this.volumeSliderView = new VolumeSliderView({eventId: 'volume', viewId: '', vent: this.vent});

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
    },

    onRender: function() {
        this.backgroundIconContent.show(this.backgroundIconView);
        this.backButtonZoneContent.show(this.backButtonView);
        this.homeButtonZoneContent.show(this.homeButtonView);
        this.playPauseButtonZoneContent.show(this.playPauseButtonView);
        this.nextButtonZoneContent.show(this.nextButtonView);
        this.volumeSliderZoneContent.show(this.volumeSliderView);
        this.leapContent.show(this.leapView);

        if (Controllers.MusicTree.isLoading() || Controllers.MusicTree.tracks.length === 0) {
            this.mainZoneContent.show(new LoadingMainZone({title: 'MUSIC USB'}));

            this.inputZone1Content.close();
            this.inputZone2Content.close();
            this.inputZone3Content.close();
            this.inputZone4Content.close();
            this.inputZone5Content.close();
        } else {
            this.renderedMainZoneView ? this.mainZoneContent.show(this.renderedMainZoneView) : this.mainZoneContent.close();

            this.inputZone1Content.show(this.inputZone1View);
            this.inputZone2Content.show(this.inputZone2View);
            this.inputZone3Content.show(this.inputZone3View);
            this.inputZone4Content.show(this.inputZone4View);
            this.inputZone5Content.show(this.inputZone5View);
        }
        
    },

    onBeforeClose: function() {
        this.vent.off();
    },

    onShow: function() {
        var self = this;

        this.listenTo(Controllers.MusicTree, 'loading loaded', function() {
            this.render();
        });
        this.listenTo(Controllers.MusicTree, 'emptied', function() {
            window.history.back();
        });

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
            selection: 0
        });

        Controllers.MusicTree.tracks.forEach(function(track) {
            trackCollection.push({text: track.get('name')});
        });

        // collection and view of artists
        var artistCollection = new Backbone.Collection([]);
        windowSize = Math.min(self.model.get('artists').length, 25);
        var artistListView = new WindowListView({
            eventId: 'artistList',
            eventSource: 'inputZone2',
            collection: artistCollection,
            viewId: '',
            vent: this.vent,
            numLevels: self.model.get('artists').length,
            windowSize: windowSize,
            windowStart: 0,
            windowSpeed: 25,
            selection: 0
        });

        Controllers.MusicTree.artists.forEach(function(artist) {
            artistCollection.push({text: artist.get('name')});
        });

        // collection and view of tracks
        var albumCollection = new Backbone.Collection([]);
        windowSize = Math.min(self.model.get('albums').length, 25);
        var albumListView = new WindowListView({
            eventId: 'albumList',
            eventSource: 'inputZone3',
            collection: albumCollection,
            viewId: '',
            vent: this.vent,
            numLevels: self.model.get('albums').length,
            windowSize: windowSize,
            windowStart: 0,
            windowSpeed: 25,
            selection: 0
        });

        Controllers.MusicTree.albums.forEach(function(album) {
            albumCollection.push({text: album.get('name')});
        });

        // collection and view of tracks
        var playlistCollection = new Backbone.Collection([]);
        windowSize = Math.min(self.model.get('playlists').length, 25);
        var playlistView = new WindowListView({
            eventId: 'playlist',
            eventSource: 'inputZone1',
            collection: playlistCollection,
            viewId: '',
            vent: this.vent,
            numLevels: self.model.get('playlists').length,
            windowSize: windowSize,
            windowStart: 0,
            windowSpeed: 25,
            selection: 0
        });

        Controllers.MusicTree.playlists.forEach(function(playlist) {
            playlistCollection.push({text: playlist.get('name')});
        });

        // starting to slide the sliders
        this.vent.on('inputZone1:touchStart', function() {
            self.renderedMainZoneView = playlistView;
            self.backgroundIconView = new BackgroundIconView({icon: '#playlistIcon'});
            self.render();
        }, this);

        // starting to slide the sliders
        this.vent.on('inputZone2:touchStart', function() {
            self.resetCollection(artistCollection, self.model.get('artists'));
            self.renderedMainZoneView = artistListView;
            self.backgroundIconView = new BackgroundIconView({icon: '#artistIcon'});
            self.render();
        }, this);

        this.vent.on('inputZone3:touchStart', function() {
            self.resetCollection(albumCollection, self.model.get('albums'));
            self.renderedMainZoneView = albumListView;
            self.backgroundIconView = new BackgroundIconView({icon: '#albumIcon'});
            self.render();
        }, this);

        this.vent.on('inputZone4:touchStart', function() {
            self.resetCollection(trackCollection, self.model.get('tracks'));
            self.renderedMainZoneView = trackListView;
            self.backgroundIconView = new BackgroundIconView({icon: '#songIcon'});
            self.render();
        }, this);

        // update main view back to default music USB
        this.vent.on('inputZone4:touchEnd', function() {
            self.renderedMainZoneView = self.mainZoneView;
            self.backgroundIconView = new BackgroundIconView({icon: '#musicIcon'});
            self.render();
        }, this);


        // update main view back to filtered music USB
        this.vent.on('inputZone1:touchEnd inputZone3:touchEnd', function() {
            Backbone.history.navigate('music/musicUSB/filteredTrackSelect', { trigger: true});
        }, this);

        this.vent.on('inputZone2:touchEnd', function() {
            Backbone.history.navigate('music/musicUSB/filteredAlbumTrackSelect', { trigger: true});
        }, this);

        this.vent.on('trackList:select ', function(data, selection) {
            self.model.set('trackSelection', selection);

            var qs = new QueueSupplier(self.model.get('tracks'));
            for (var z = 0; z < selection; z++) {
                qs.next();
            }
            Controllers.Music.setSupplier(qs);
            Controllers.Music.start();

            self.resetModel();

            self.resetView(trackListView, Controllers.MusicTree.tracks.models.length);

            self.resetView(albumListView, Controllers.MusicTree.albums.models.length + 1);

            self.resetView(artistListView, Controllers.MusicTree.artists.models.length + 1);

            playlistView.windowStart = 0;
            playlistView.selection = 0;

            self.render();
        }, this);

        this.vent.on('albumList:select ', function(data, selection) {
            self.model.set('albumSelection', selection);

            var dataForAlbum = Controllers.MusicTree.albums.find(function(album) {
                return _.equal(album.get('name'), data.model.get('text'));
            });

            var dataForTracks = dataForAlbum.tracks.models;
            self.model.set('album', data.model.get('text'));
            self.model.set('albumImage', dataForTracks[0].get('image'));

            self.model.set('tracks', dataForTracks);
        }, this);

        this.vent.on('playlist:select ', function(data, selection) {

            dataForPlayList = Controllers.MusicTree.playlists.find(function(playlist) {
                return _.equal(playlist.get('name'), data.model.get('text'));
            });

            self.model.set('playlist', data.model.get('text'));
            var dataForTracks = dataForPlayList.tracks.models;   
            self.model.set('tracks', dataForTracks);

        }, this);


        this.vent.on('artistList:select ', function(data, selection) {

            var dataForArtist = Controllers.MusicTree.artists.find(function(artist) {
                return _.equal(artist.get('name'), data.model.get('text'));
            });

            self.model.set('artist', data.model.get('text'));

            var dataForAlbums = dataForArtist.albums.models;
            var dataForTracks = dataForArtist.tracks.models;

            self.model.set('albums', dataForAlbums);

            self.resetView(albumListView, dataForAlbums.length);

            self.model.set('tracks', dataForTracks);

            self.resetView(trackListView, dataForTracks.length);

        }, this);

    },

    resetModel: function() {
        this.model.set('tracks', Controllers.MusicTree.tracks.models);
        this.model.set('album', '');
        this.model.set('albumImage', '');
        this.model.set('albums', Controllers.MusicTree.albums.models);
        this.model.set('artist', '');
        this.model.set('artists', Controllers.MusicTree.artists.models);
        this.model.set('playlist', '');
        this.model.set('playlists', Controllers.MusicTree.playlists.models);
    },

    resetCollection: function(collection, data) {
        collection.reset();
        for (var j = 0; j < data.length; j++) {
            collection.push({text: data[j].get('name')});
        }
        
    },

    resetView: function(view, length) {

        view.numLevels = length;
        view.windowSize = Math.min(length, 25);
        view.windowStart = 0;
        view.selection = 0;
    }
});



