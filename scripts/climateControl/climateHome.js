/**
 * View for climate control home screen
 */

var ClimateHomeScreen = ScreenLayout.extend({
	_getEventPosition: function(data) {
        data = data.originalEvent;
        if (data.touches) {
            return data.touches[0].clientX;
        } else {
            return data.clientX;
        }
    },

    onRender: function() {
        this.mainZoneContent.show(new ClockView());
        var vent = _.extend({}, Backbone.Events);
        var backButtonView = new ButtonView({icon: "#backIcon", eventCatcher: "#backButtonZoneEventCatcher", vent: vent});
        var homeButtonView = new ButtonView({icon: "#homeIcon", eventCatcher: "#homeButtonZoneEventCatcher", vent: vent});
        var inputZone1View = new SliderView({iconLeft: "", iconRight: "", leftLabel: "DRIVER", rightLabel: "PASSENGER", eventCatcher: "#inputZone1EventCatcher", vent: vent});
        var inputZone2View = new SliderView({iconLeft: "", iconRight: "", leftLabel: "TEMP", rightLabel: "", eventCatcher: "#inputZone2EventCatcher", vent: vent});
        var inputZone3View = new SliderView({iconLeft: "", iconRight: "", leftLabel: "FAN", rightLabel: "", eventCatcher: "#inputZone3EventCatcher", vent: vent});
        vent.on('slider:touch', function(data) {
            console.log("Start!");
        });
        vent.on('slider:change', function(data) {
            // Calculating percentage of dragging of slider
            data.preventDefault();
            var x = data.originalEvent.touches[0].pageX;
            var offsetX = x - $("#inputZone2Content").offset().left;
            var percentageX = offsetX / 800;
            if (percentageX < 0) {
                percentageX = 0;
            } else if (percentageX > 1) {
                percentageX = 1;
            }
            console.log("Percentage: " + percentageX);
        });
        vent.on('slider:touchEnd', function(data) {
            console.log("End!");
        });
    },
});



