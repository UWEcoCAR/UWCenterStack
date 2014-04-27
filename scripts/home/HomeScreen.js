/**
 * Model and View for home screen
 */

HomeScreen = ScreenLayout.extend({
    initialize: function() {
        this.climateControlButtonVent = _.extend({}, Backbone.Events);
        this.inputZone1View = new SliderButtonsView({iconLeft: "#musicIcon", iconRight: "#playIcon", eventCatcher: "#inputZone1EventCatcher", vent: this.climateControlButtonVent});
        this.inputZone2View = new SliderButtonsView({id: 'climateControlButton', iconLeft: "#fanIcon", iconRight: "#leafIcon", eventCatcher: "#inputZone2EventCatcher", vent: this.climateControlButtonVent});
        this.inputZone3View = new SliderButtonsView({iconLeft: "#phoneIcon", iconRight: "#settingsIcon", eventCatcher: "#inputZone3EventCatcher", vent: this.climateControlButtonVent});
        this.inputZone4View = new SliderButtonsView({iconLeft: "#navigationIcon", iconRight: "#moreIcon", eventCatcher: "#inputZone4EventCatcher", vent: this.climateControlButtonVent});
        this.volumeSliderView = new VolumeSliderView();
        this.mainZoneView = new HomeMainZone();

        this.climateControlButtonVent.on('climateControlButton:clickLeft', function(data) {
            Backbone.history.navigate('climate', { trigger: true });
        });
    },

    onRender: function() {
        this.mainZoneContent.show(this.mainZoneView);
        this.volumeSliderZoneContent.show(this.volumeSliderView);
        this.inputZone1Content.show(this.inputZone1View);
        this.inputZone2Content.show(this.inputZone2View);
        this.inputZone3Content.show(this.inputZone3View);
        this.inputZone4Content.show(this.inputZone4View);
    }
});