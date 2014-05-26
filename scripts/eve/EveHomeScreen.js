EveHomeScreen = ScreenLayout.extend({

    initialize: function(options) {

        // back/home button defaults
        this.backgroundIconView = new BackgroundIconView({icon: '#leafIcon'});
        this.backButtonView = new BackButtonView();
        this.homeButtonView = new HomeButtonView();

        this.vent = _.extend({}, Backbone.Events);

        this.playPauseButtonView = new PreviousButtonView();
        this.nextButtonView = new NextButtonView({vent: this.vent});
        
        this.volumeSliderView = new VolumeSliderView({eventId: 'volume', viewId: '', vent: this.vent});
        
        this.inputZone1View = new SliderButtonsView({
            eventId: 'inputZone1',
            iconLeft: '#profileIcon',
            eventCatcher: '#inputZone1EventCatcher',
            vent: this.vent
        });

        this.inputZone2View = new SliderView({
            eventId: 'inputZone2',
            iconLeft: "#batteryIcon",
            eventCatcher: "#inputZone2EventCatcher",
            vent: this.vent
        });
        this.inputZone3View = new SliderView({
            eventId: 'inputZone3',
            iconLeft: "#moneyIcon",
            eventCatcher: "#inputZone3EventCatcher",
            vent: this.vent
        });
        this.inputZone4View = new SliderView({
            eventId: 'inputZone4',
            iconLeft: "#medalIcon",
            eventCatcher: "#inputZone4EventCatcher",
            vent: this.vent
        });
        this.inputZone5View = new SliderButtonsView({
            eventId: 'inputZone5',
            iconLeft: "#navigationIcon",
            eventCatcher: "#inputZone5EventCatcher",
            vent: this.vent
        });
        this.mainZoneView = new EveHomeMainZone();

    },

    onRender: function() {
        this.mainZoneContent.show(this.mainZoneView);
        this.backgroundIconContent.show(this.backgroundIconView);
        this.backButtonZoneContent.show(this.backButtonView);
        this.homeButtonZoneContent.show(this.homeButtonView);
        this.volumeSliderZoneContent.show(this.volumeSliderView);

        this.playPauseButtonZoneContent.show(this.playPauseButtonView);
        this.nextButtonZoneContent.show(this.nextButtonView);

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
        this.vent.on('inputZone1:clickLeft', function() {
            self.mainZoneView = new EveHomeMainZone();
            self.render();
        }, this);

       this.vent.on('inputZone2:touchStart', function() {
            self.mainZoneView = new EveMPGEMainZone();
            self.render();
        }, this);

        this.vent.on('inputZone3:touchStart', function() {
            self.mainZoneView = new EveCostMainZone();
            self.render();
        }, this);
    }
});