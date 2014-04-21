/**
 * View for climate control home screen
 */

var ClimateHomeScreen = ScreenLayout.extend({
    onRender: function() {
        this.mainZoneContent.show(new ClockView());
        var vent = _.extend({}, Backbone.Events);
        var backButtonView = new ButtonView({icon: "#backIcon", eventCatcher: "#backButtonZoneEventCatcher", vent: vent});
        var homeButtonView = new ButtonView({icon: "#homeIcon", eventCatcher: "#homeButtonZoneEventCatcher", vent: vent});
        var inputZone1View = new SliderView({iconLeft: "", iconRight: "", leftLabel: "DRIVER", rightLabel: "PASSENGER", eventCatcher: "#inputZone1EventCatcher", vent: vent});
        var inputZone2View = new SliderView({iconLeft: "", iconRight: "", leftLabel: "TEMP", rightLabel: "", eventCatcher: "#inputZone2EventCatcher", vent: vent});
        var inputZone3View = new SliderView({iconLeft: "", iconRight: "", leftLabel: "FAN", rightLabel: "", eventCatcher: "#inputZone3EventCatcher", vent: vent});
        vent.on('slider:touch', function(data) {
            console.log(data.clientX);
        });
        vent.on('slider:change', function(data) {
            console.log(data.clientX);
        });
        vent.on('slider:touchEnd', function(data) {
            console.log(data.clientX);
        });
    }
});



