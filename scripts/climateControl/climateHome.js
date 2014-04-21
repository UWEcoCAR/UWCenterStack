/**
 * View for climate control home screen
 */

ClimateHomeScreen = ScreenLayout.extend({

    initialize: function() {
        this.backButtonVent = _.extend({}, Backbone.Events);
        this.homeButtonVent = _.extend({}, Backbone.Events);
        this.inputZone1Vent = _.extend({}, Backbone.Events);
        this.inputZone2Vent = _.extend({}, Backbone.Events);
        this.inputZone3Vent = _.extend({}, Backbone.Events);
        this.backButtonView = new ButtonView({icon: "#backIcon", eventCatcher: "#backButtonZoneEventCatcher", vent: this.backButtonVent});
        this.homeButtonView = new ButtonView({icon: "#homeIcon", eventCatcher: "#homeButtonZoneEventCatcher", vent: this.homeButtonVent});
        this.inputZone1View = new SliderView({leftLabel: "DRIVER", rightLabel: "PASSENGER", eventCatcher: "#inputZone1EventCatcher", vent: this.inputZone1Vent});
        this.inputZone2View = new SliderView({leftLabel: "TEMP", eventCatcher: "#inputZone2EventCatcher", vent: this.inputZone2Vent});
        this.inputZone3View = new SliderView({leftLabel: "FAN", eventCatcher: "#inputZone3EventCatcher", vent: this.inputZone3Vent});

        this.inputZone2Vent.on('slider:touchStart', _.bind(function(data) {
            var vent = _.extend({}, Backbone.Events);
            var collection = new Backbone.Collection([]);
            var listView = new ListView({
                collection: collection,
                vent: vent
            });
            for (var i = 0; i < 100; i++) {
                collection.push({text: 'test' + i});
            }
            this.mainZoneView = listView;
            this.render();
        }, this));
        this.inputZone2Vent.on('slider:touchMove', function(data) {
        });
        this.inputZone2Vent.on('slider:touchEnd', _.bind(function(data) {
            this.mainZoneView = undefined;
            this.render();
        }, this));
    },

    onRender: function() {
        this.mainZoneView ? this.mainZoneContent.show(this.mainZoneView) : this.mainZoneContent.close();
        this.backButtonZoneContent.show(this.backButtonView);
        this.homeButtonZoneContent.show(this.homeButtonView);
        this.inputZone1Content.show(this.inputZone1View);
        this.inputZone2Content.show(this.inputZone2View);
        this.inputZone3Content.show(this.inputZone3View);
    }
});



