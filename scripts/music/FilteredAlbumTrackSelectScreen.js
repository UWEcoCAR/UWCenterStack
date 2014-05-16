/**
 * View for music home screen
 */
FilteredAlbumTrackSelectScreen= ScreenLayout.extend({

    initialize: function() {
        window.model = this.model;
        
        // back/home button defaults
        this.backgroundIconView = new BackgroundIconView({icon: '#iPodIcon'});
        this.backButtonView = new BackButtonView();
        this.homeButtonView = new HomeButtonView();

        this.vent = _.extend({}, Backbone.Events);

        this.playPauseButtonView = new PreviousButtonView();
        this.nextButtonView = new NextButtonView();
        
        // volume slider
        this.volumeSliderView = new VolumeSliderView({eventId: 'volume', viewId: '', vent: this.vent});

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


        // default main zone view
        this.currentMusicModel = new CurrentMusicModel();
        this.currentMusicModel.set('playList', 'some playlist');
        this.renderedMainZoneView = this.mainZoneView = new CurrentMusicSelectionView({model: this.currentMusicModel});
    },

    onRender: function() {
        this.backgroundIconContent.show(this.backgroundIconView);
        this.backButtonZoneContent.show(this.backButtonView);
        this.homeButtonZoneContent.show(this.homeButtonView);
        this.playPauseButtonZoneContent.show(this.playPauseButtonView);
        this.nextButtonZoneContent.show(this.nextButtonView);
        this.volumeSliderZoneContent.show(this.volumeSliderView);


        this.renderedMainZoneView ? this.mainZoneContent.show(this.renderedMainZoneView) : this.mainZoneContent.close();
        this.inputZone3Content.show(this.inputZone3View);
        this.inputZone4Content.show(this.inputZone4View);
        
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
            selection: self.model.get('trackSelection')
        });

        Controllers.MusicTree.tracks.forEach(function(track) {
            trackCollection.push({text: track.get('name')});
        });

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

        this.vent.on('inputZone4:touchStart', function() {
            self.resetCollection(trackCollection, self.model.get('tracks'));
            self.renderedMainZoneView = trackListView;
            self.backgroundIconView = new BackgroundIconView({icon: '#songIcon'});
            self.render();
        }, this);

        this.vent.on('inputZone4:touchEnd', function() {
            window.history.back();
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
        }, this);

        this.vent.on('inputZone3:touchStart', function() {
            self.resetCollection(albumCollection, self.model.get('albums'));
            self.renderedMainZoneView = albumListView;
            self.backgroundIconView = new BackgroundIconView({icon: '#albumIcon'});
            self.render();
        }, this);

        this.vent.on('inputZone3:touchEnd', function() {
           Backbone.history.navigate('music/musicUSB/filteredTrackSelect', { trigger: true});
        }, this);

        this.vent.on('albumList:select ', function(data, selection) {
            self.model.set('albumSelection', selection);

            var dataForAlbum = Controllers.MusicTree.albums.find(function(album) {
                return _.equal(album.get('name'), data.model.get('text'));
            });

            self.model.set('album', data.model.get('text'));

            var dataForTracks = dataForAlbum.tracks.models;
            self.model.set('tracks', dataForTracks);
            self.model.set('trackSelection', 0);

        }, this);

    },

    resetModel: function() {
        this.model.set('tracks', Controllers.MusicTree.tracks.models);
        this.model.set('trackSelection', 0);
        this.model.set('album', '');
        this.model.set('albums', Controllers.MusicTree.albums.models);
        this.model.set('albumSelection', 0);
        this.model.set('artist', '');
        this.model.set('artists', Controllers.MusicTree.artists.models);
        this.model.set('artistSelection', 0);
        this.model.set('artistInformation', null);
        this.model.set('playlist', '');
        this.model.set('playlists', Controllers.MusicTree.playlists.models);
        this.model.set('playlistSelection', 0);
        this.model.set('playlistInformation', null);
    },

   resetCollection: function(collection, data) {
        collection.reset();
        for (var j = 0; j < data.length; j++) {
            collection.push({text: data[j].get('name')});
        }
        
    },
});



