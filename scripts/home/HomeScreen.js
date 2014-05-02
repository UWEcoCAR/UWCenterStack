/**
 * Model and View for home screen
 */

HomeScreen = ScreenLayout.extend({
    initialize: function() {
        this.vent = _.extend({}, Backbone.Events);
        this.inputZone1View = new SliderButtonsView({eventId: 'inputZone1', iconLeft: "#musicIcon", iconRight: "#playIcon", eventCatcher: "#inputZone1EventCatcher", vent: this.vent});
        this.inputZone2View = new SliderButtonsView({eventId: 'inputZone2', iconLeft: "#fanIcon", iconRight: "#leafIcon", eventCatcher: "#inputZone2EventCatcher", vent: this.vent});
        this.inputZone3View = new SliderButtonsView({eventId: 'inputZone3', iconLeft: "#phoneIcon", iconRight: "#settingsIcon", eventCatcher: "#inputZone3EventCatcher", vent: this.vent});
        this.inputZone4View = new SliderButtonsView({eventId: 'inputZone4', iconLeft: "#navigationIcon", iconRight: "#moreIcon", eventCatcher: "#inputZone4EventCatcher", vent: this.vent});
        this.volumeSliderView = new VolumeSliderView();
        this.mainZoneView = new HomeMainZone();

        this.vent.on('inputZone2:clickLeft', function() {
            Backbone.history.navigate('climate', { trigger: true });
        }, this);
    },

    onRender: function() {
        this.mainZoneContent.show(this.mainZoneView);
        this.volumeSliderZoneContent.show(this.volumeSliderView);
        this.inputZone1Content.show(this.inputZone1View);
        this.inputZone2Content.show(this.inputZone2View);
        this.inputZone3Content.show(this.inputZone3View);
        this.inputZone4Content.show(this.inputZone4View);
    },

    onClose: function() {
        this.vent.off(null, null, this);
    }
});