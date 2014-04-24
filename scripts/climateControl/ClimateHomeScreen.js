/**
 * View for climate control home screen
 */
ClimateHomeScreen = ScreenLayout.extend({

    initialize: function() {

        window.model = this.model = new ClimateControlModel();

        this.inputZone1Vent = _.extend({}, Backbone.Events);
        this.inputZone2Vent = _.extend({}, Backbone.Events);
        this.inputZone3Vent = _.extend({}, Backbone.Events);
        this.backButtonView = new BackButtonView();
        this.homeButtonView = new HomeButtonView();
        this.inputZone1View = new SliderButtonsView({leftLabel: "DRIVER", rightLabel: "PASSENGER", eventCatcher: "#inputZone1EventCatcher", vent: this.inputZone1Vent});
        this.inputZone2View = new SliderView({iconLeft: "#temperatureIcon", eventCatcher: "#inputZone2EventCatcher", vent: this.inputZone2Vent});
        this.inputZone3View = new SliderView({leftLabel: "FAN", eventCatcher: "#inputZone3EventCatcher", vent: this.inputZone3Vent});
        this.renderedMainZoneView = this.mainZoneView = new ClimateControlMainZone({ model: this.model });

        // collection of possible temperatures
        var temperatureCollection = new Backbone.Collection([]);
        this.temperatureListView = new ListView({
            collection: temperatureCollection,
            vent: this.inputZone2Vent
        });
        for (var i = 60; i <= 85; i++) {
            temperatureCollection.push({text: i});
        }

        // collection of possible fan speeds
        var fanSpeedCollection = new Backbone.Collection([]);
        this.fanSpeedListView = new ListView({
            collection: fanSpeedCollection,
            vent: this.inputZone3Vent
        });
        for (var j = 0; j <= 100; j+=4) {
            fanSpeedCollection.push({text: j});
        }

        // Temperature Selection
        this.inputZone2Vent.on('slider:touchStart', _.bind(function(data) {
            this.renderedMainZoneView = this.temperatureListView;
            this.render();
        }, this));

        this.inputZone2Vent.on('list:select', _.bind(function(data) {
            if (this.model.get('controlMode') === 'driver') {
                this.model.set('driverTemp', data.model.get('text'));
            } else {
                this.model.set('passengerTemp', data.model.get('text'));
            }
        }, this));

        this.inputZone2Vent.on('slider:touchEnd', _.bind(function(data) {
            this.renderedMainZoneView = this.mainZoneView;
            this.render();
        }, this));

        // Fan Speed Selection
        this.inputZone3Vent.on('slider:touchStart', _.bind(function(data) {
            this.renderedMainZoneView = this.fanSpeedListView;
            this.render();
        }, this));

        this.inputZone3Vent.on('list:select', _.bind(function(data) {
            // TODO: Need to decide what to do here
        }, this));

        this.inputZone3Vent.on('slider:touchEnd', _.bind(function(data) {
            this.renderedMainZoneView = this.mainZoneView;
            this.render();
        }, this));

        this.inputZone1Vent.on('clickLeft', _.bind(function() {
            this.model.set('controlMode', 'driver');
            this.render();
        }, this));

        this.inputZone1Vent.on('clickRight', _.bind(function() {
            this.model.set('controlMode', 'passenger');
            this.render();
        }, this));
    },

    onRender: function() {
        this.renderedMainZoneView ? this.mainZoneContent.show(this.renderedMainZoneView) : this.mainZoneContent.close();
        this.backButtonZoneContent.show(this.backButtonView);
        this.homeButtonZoneContent.show(this.homeButtonView);
        this.inputZone1Content.show(this.inputZone1View);
        this.inputZone2Content.show(this.inputZone2View);
        this.inputZone3Content.show(this.inputZone3View);


        this.inputZone1View.$el.find('.leftLabel').toggleClass('selected', this.model.get('controlMode') === 'driver');
        this.inputZone1View.$el.find('.rightLabel').toggleClass('selected', this.model.get('controlMode') === 'passenger');


    }
});



