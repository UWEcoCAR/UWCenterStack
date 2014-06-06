InternetRadioHomeScreen = ScreenLayout.extend({

    id: 'internetRadioHomeScreen',

    initialize: function() {

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

        this.inputZone1View = new SliderButtonsView({
            eventId: 'inputZone1',
            eventCatcher: '#inputZone1EventCatcher',
            vent: this.vent
        });

        this.inputZone2View = new SliderButtonsView({
            eventId: 'inputZone2',
            eventCatcher: '#inputZone2EventCatcher',
            vent: this.vent
        });

        this.inputZone3View = new SliderButtonsView({
            eventId: 'inputZone3',
            eventCatcher: '#inputZone3EventCatcher',
            vent: this.vent
        });

        this.inputZone4View = new SliderButtonsView({
            eventId: 'inputZone4',
            eventCatcher: '#inputZone4EventCatcher',
            vent: this.vent
        });

        this.inputZone5View = new SliderButtonsView({
            eventId: 'inputZone5',
            eventCatcher: '#inputZone5EventCatcher',
            vent: this.vent
        });

        this.mainZoneView = new InternetRadioMainZoneView();

        // default main zone view of radio
        this.renderedMainZoneView = this.loadingMainZone = new LoadingMainZone({ title: 'INTERNET RADIO', label: 'connecting' });

        this.connectionChecker = new ConnectionChecker();
    },

    onRender: function() {
        this.backgroundIconContent.show(this.backgroundIconView);
        this.backButtonZoneContent.show(this.backButtonView);
        this.homeButtonZoneContent.show(this.homeButtonView);
        this.playPauseButtonZoneContent.show(this.playPauseButtonView);
        this.nextButtonZoneContent.show(this.nextButtonView);
        this.volumeSliderZoneContent.show(this.volumeSliderView);
        this.leapContent.show(this.leapView);
        this.mainZoneContent.show(this.supplier ? this.mainZoneView : this.loadingMainZone);

        this.inputZone1View.labelLeft = '';
        this.inputZone2View.labelLeft = '';
        this.inputZone3View.labelLeft = '';
        this.inputZone4View.labelLeft = '';
        this.inputZone5View.labelLeft = '';
        this.inputZone1View.labelRight = '';
        this.inputZone2View.labelRight = '';
        this.inputZone3View.labelRight = '';
        this.inputZone4View.labelRight = '';
        this.inputZone5View.labelRight = '';

        var stations;
        if (this.supplier) {
            stations = this.supplier.getStations();
            this.inputZone1View.labelLeft = stations.length > 0 && stations.at(0).get('name');
            this.inputZone2View.labelLeft = stations.length > 1 && stations.at(1).get('name');
            this.inputZone3View.labelLeft = stations.length > 2 && stations.at(2).get('name');
            this.inputZone4View.labelLeft = stations.length > 3 && stations.at(3).get('name');
            this.inputZone5View.labelLeft = stations.length > 4 && stations.at(4).get('name');
            this.inputZone1View.labelRight = stations.length > 5 && stations.at(5).get('name');
            this.inputZone2View.labelRight = stations.length > 6 && stations.at(6).get('name');
            this.inputZone3View.labelRight = stations.length > 7 && stations.at(7).get('name');
            this.inputZone4View.labelRight = stations.length > 8 && stations.at(8).get('name');
            this.inputZone5View.labelRight = stations.length > 9 && stations.at(9).get('name');
        }

        this.inputZone1Content.show(this.inputZone1View);
        this.inputZone2Content.show(this.inputZone2View);
        this.inputZone3Content.show(this.inputZone3View);
        this.inputZone4Content.show(this.inputZone4View);
        this.inputZone5Content.show(this.inputZone5View);


        if (this.supplier) {
            stations = this.supplier.getStations();
            var currentStation = stations.find(_.bind(function(station) {
                return this.supplier.getCurrentStation() && this.supplier.getCurrentStation().id === station.id;
            }, this));
            if (currentStation) {
                this.inputZone1View.$el.find('.labelLeft').toggleClass('selected', stations.at(0) && currentStation.id === stations.at(0).id);
                this.inputZone2View.$el.find('.labelLeft').toggleClass('selected', stations.at(1) && currentStation.id === stations.at(1).id);
                this.inputZone3View.$el.find('.labelLeft').toggleClass('selected', stations.at(2) && currentStation.id === stations.at(2).id);
                this.inputZone4View.$el.find('.labelLeft').toggleClass('selected', stations.at(3) && currentStation.id === stations.at(3).id);
                this.inputZone5View.$el.find('.labelLeft').toggleClass('selected', stations.at(4) && currentStation.id === stations.at(4).id);
                this.inputZone1View.$el.find('.labelRight').toggleClass('selected', stations.at(5) && currentStation.id === stations.at(5).id);
                this.inputZone2View.$el.find('.labelRight').toggleClass('selected', stations.at(6) && currentStation.id === stations.at(6).id);
                this.inputZone3View.$el.find('.labelRight').toggleClass('selected', stations.at(7) && currentStation.id === stations.at(7).id);
                this.inputZone4View.$el.find('.labelRight').toggleClass('selected', stations.at(8) && currentStation.id === stations.at(8).id);
                this.inputZone5View.$el.find('.labelRight').toggleClass('selected', stations.at(9) && currentStation.id === stations.at(9).id);
            }
        } else {
            this.inputZone1View.$el.find('.active').removeClass('active');
        }
    },

    onBeforeClose: function() {
        this.vent.off();
    },

    onShow: function() {
        var supplier = Controllers.Music.getSupplier();
        if (supplier && supplier.isFeedSupplier) {
            this.supplier = supplier;
            this.render();
        } else {
            this.listenTo(this.connectionChecker, 'connected', function() {
                var supplier = new FeedSupplier(_.bind(function() {
                    this.supplier = supplier;
                    this.render();
                }, this));
            });
            this.listenTo(this.connectionChecker, 'disconnected', function() {
                this.supplier = undefined;
                this.render();
            });
            this.connectionChecker.start();
        }

        this.vent.on('inputZone1:clickLeft', function() {this._setStation(0);}, this);
        this.vent.on('inputZone2:clickLeft', function() {this._setStation(1);}, this);
        this.vent.on('inputZone3:clickLeft', function() {this._setStation(2);}, this);
        this.vent.on('inputZone4:clickLeft', function() {this._setStation(3);}, this);
        this.vent.on('inputZone5:clickLeft', function() {this._setStation(4);}, this);
        this.vent.on('inputZone1:clickRight', function() {this._setStation(5);}, this);
        this.vent.on('inputZone2:clickRight', function() {this._setStation(6);}, this);
        this.vent.on('inputZone3:clickRight', function() {this._setStation(7);}, this);
        this.vent.on('inputZone4:clickRight', function() {this._setStation(8);}, this);
        this.vent.on('inputZone5:clickRight', function() {this._setStation(9);}, this);
    },

    _setStation: function(index) {
        if (this.supplier && this.supplier.getStations().length >= index && this.supplier.getCurrentStation() != this.supplier.getStations().at(index)) {
            var station = this.supplier.getStations().at(index);
            this.supplier.setStation(station);
            this.render();
            Controllers.Music.setSupplier(this.supplier).start();
        }
    },

    onClose: function() {
        this.connectionChecker.stop();
    }

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



