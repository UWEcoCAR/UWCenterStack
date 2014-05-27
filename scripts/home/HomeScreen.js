/**
 * Model and View for home screen
 */

HomeScreen = ScreenLayout.extend({
    initialize: function() {
        this.vent = _.extend({}, Backbone.Events);
        this.backgroundIconView = new BackgroundIconView({icon: '#homeIcon'});
        this.leapView = new LeapView();
        this.inputZone1View = new SliderButtonsView({eventId: 'inputZone1', iconLeft: "#musicIcon", iconRight: "#playIcon", eventCatcher: "#inputZone1EventCatcher", vent: this.vent});
        this.inputZone2View = new SliderButtonsView({eventId: 'inputZone2', iconLeft: "#fanIcon", iconRight: "#phoneIcon", eventCatcher: "#inputZone2EventCatcher", vent: this.vent});
        this.inputZone3View = new SliderButtonsView({eventId: 'inputZone3', iconLeft: "#leafIcon", iconRight: "#navigationIcon", eventCatcher: "#inputZone3EventCatcher", vent: this.vent});
        this.inputZone4View = new SliderButtonsView({eventId: 'inputZone4', iconLeft: "#settingsIcon", iconRight: "#moreIcon", eventCatcher: "#inputZone4EventCatcher", vent: this.vent});
        this.volumeSliderView = new VolumeSliderView({eventId: 'volume', viewId: '', vent: this.vent});

        this.playPauseButtonView = new PreviousButtonView();
        this.nextButtonView = new NextButtonView({vent: this.vent});

        this.mainZoneView = new HomeMainZone();

    },

    onRender: function() {
        this.backgroundIconContent.show(this.backgroundIconView);
        this.leapContent.show(this.leapView);
        this.mainZoneContent.show(this.mainZoneView);
        this.volumeSliderZoneContent.show(this.volumeSliderView);

        this.playPauseButtonZoneContent.show(this.playPauseButtonView);
        this.nextButtonZoneContent.show(this.nextButtonView);

        this.inputZone1Content.show(this.inputZone1View);
        this.inputZone2Content.show(this.inputZone2View);
        this.inputZone3Content.show(this.inputZone3View);
        this.inputZone4Content.show(this.inputZone4View);
        this.gearLeverPositionContent.show(new GearLeverPositionView());
    },

    onBeforeClose: function() {
        this.vent.off();
    },

    onShow: function() {
        this.vent.on('inputZone1:clickLeft', function() {
            Backbone.history.navigate('music', { trigger: true});
        }, this);

        this.vent.on('inputZone2:clickLeft', function() {
            Backbone.history.navigate('climate', { trigger: true });
        }, this);

        this.vent.on('inputZone3:clickLeft', function() {
            console.log('hola');
            Backbone.history.navigate('eve', { trigger: true });
        }, this);


    }
});