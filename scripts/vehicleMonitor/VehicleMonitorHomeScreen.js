ClimateHomeScreen = ScreenLayout.extend({

    initialize: function(options) {

        // back/home button defaults
        this.backgroundIconView = new BackgroundIconView({icon: '#settingsIcon'});
        this.backButtonView = new BackButtonView();
        this.homeButtonView = new HomeButtonView();
        this.leapView = new LeapView();

        this.playPauseButtonView = new PreviousButtonView();
        this.nextButtonView = new NextButtonView();

        // volume slider
        this.volumeSliderView = new VolumeSliderView({eventId: 'volume', viewId: '', vent: this.vent});

        // default main zone view of climte control
        this.model = new VehicleMonitorModel();
        this.mainZoneView = new VehicleMonitorMainZone({ model: this.model });
    },

    onRender: function() {
        this.mainZoneContent.show(this.mainZoneView);
        this.backgroundIconContent.show(this.backgroundIconView);
        this.backButtonZoneContent.show(this.backButtonView);
        this.homeButtonZoneContent.show(this.homeButtonView);
        this.volumeSliderZoneContent.show(this.volumeSliderView);
        this.leapContent.show(this.leapView);

        this.playPauseButtonZoneContent.show(this.playPauseButtonView);
        this.nextButtonZoneContent.show(this.nextButtonView);
    },

    onShow: function() {
        this.interval = setInterval(_.bind(function() {
            this.model.set('batteryVoltage', Controllers.CanReadWriter.getMail('batteryVoltage'));
            this.model.set('batteryCurrent', Controllers.CanReadWriter.getMail('batteryCurrent'));
            this.model.set('batterySoc', Controllers.CanReadWriter.getMail('batterySoc'));
            this.mainZoneContent.show(this.mainZoneView);
        }, this), 2000);
    },

    onBeforeClose: function() {
        this.vent.off();
    }

});



