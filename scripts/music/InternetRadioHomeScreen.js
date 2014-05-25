InternetRadioHomeScreen = ScreenLayout.extend({

    initialize: function() {
//
//        window.model = this.model;
//        this.resetModel();

        // back/home button defaults
        this.backgroundIconView = new BackgroundIconView({icon: '#radioIcon'});
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
            eventId: 'inputZone5',
            viewId: ''
        });

        // default main zone view of musicUSB home
        this.renderedMainZoneView = this.mainZoneView = new LoadingMainZone({ title: 'INTERNET RADIO', label: 'connecting' });
    },

    onRender: function() {
        this.backgroundIconContent.show(this.backgroundIconView);
        this.backButtonZoneContent.show(this.backButtonView);
        this.homeButtonZoneContent.show(this.homeButtonView);
        this.playPauseButtonZoneContent.show(this.playPauseButtonView);
        this.nextButtonZoneContent.show(this.nextButtonView);
        this.volumeSliderZoneContent.show(this.volumeSliderView);
        this.leapContent.show(this.leapView);
        this.mainZoneContent.show(this.renderedMainZoneView);
    },

    onBeforeClose: function() {
        this.vent.off();
    },

    onShow: function() {

    },

//    resetModel: function() {
//        this.model.set('tracks', Controllers.MusicTree.tracks.models);
//        this.model.set('album', '');
//        this.model.set('albumImage', '');
//        this.model.set('albums', Controllers.MusicTree.albums.models);
//        this.model.set('artist', '');
//        this.model.set('artists', Controllers.MusicTree.artists.models);
//        this.model.set('playlist', '');
//        this.model.set('playlists', Controllers.MusicTree.playlists.models);
//    },

});



