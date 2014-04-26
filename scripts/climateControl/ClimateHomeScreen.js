/**
 * View for climate control home screen
 */
ClimateHomeScreen = ScreenLayout.extend({

    initialize: function() {

        window.model = this.model = new ClimateControlModel();

        this.inputZone1Vent = _.extend({}, Backbone.Events);
        this.inputZone2Vent = _.extend({}, Backbone.Events);
        this.inputZone3Vent = _.extend({}, Backbone.Events);
        this.inputZone4Vent = _.extend({}, Backbone.Events);
        this.inputZone5Vent = _.extend({}, Backbone.Events);
        this.backButtonView = new BackButtonView();
        this.homeButtonView = new HomeButtonView();
        this.volumeSliderView = new VolumeSliderView();
        this.inputZone1View = new SliderButtonsView({iconLeft: "#driverIcon", iconRight: "#passengerIcon", eventCatcher: "#inputZone1EventCatcher", vent: this.inputZone1Vent});
        this.inputZone2View = new SliderView({iconLeft: "#temperatureIcon", eventCatcher: "#inputZone2EventCatcher", vent: this.inputZone2Vent});
        this.inputZone3View = new SliderView({iconLeft: "#fanIcon", eventCatcher: "#inputZone3EventCatcher", vent: this.inputZone3Vent});
        this.inputZone4View = new SliderView({labelLeft: "AIRFLOW", eventCatcher: "#inputZone4EventCatcher", vent: this.inputZone4Vent});
        this.inputZone5View = new SliderButtonsView({iconLeft: "#defrostFrontIcon", iconRight: "#defrostRearIcon",eventCatcher: "#inputZone5EventCatcher", vent: this.inputZone5Vent});
        this.renderedMainZoneView = this.mainZoneView = new ClimateControlMainZone({ model: this.model });

        // collection of possible temperatures
        var temperatureCollection = new Backbone.Collection([]);
        this.temperatureListView = new ListView({
            collection: temperatureCollection,
            vent: this.inputZone2Vent,
            numLevels: 25
        });
        for (var i = 60; i <= 85; i++) {
            temperatureCollection.push({text: i});
        }

        // collection of possible fan speeds
        var fanSpeedCollection = new Backbone.Collection([]);
        this.fanSpeedListView = new ListView({
            collection: fanSpeedCollection,
            vent: this.inputZone3Vent,
            numLevels: 25
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
            if (this.model.get('controlMode') === 'driver') {
                this.model.set('driverFanSpeed', data.model.get('text'));
            } else {
                this.model.set('passengerFanSpeed', data.model.get('text'));
            }
        }, this));

        this.inputZone3Vent.on('slider:touchEnd', _.bind(function(data) {
            this.renderedMainZoneView = this.mainZoneView;
            this.render();
        }, this));

        // Driver-Passenger mode selection
        this.inputZone1Vent.on('clickLeft', _.bind(function() {
            this.model.set('controlMode', 'driver');
            this.render();
        }, this));

        this.inputZone1Vent.on('clickRight', _.bind(function() {
            this.model.set('controlMode', 'passenger');
            this.render();
        }, this));

        // Air-Flow selection
        this.inputZone4Vent.on('list:select', _.bind(function(data) {
            if (this.model.get('controlMode') === 'driver') {
                this.model.set('driverAirFlow', data.model.get('text'));
            } else {
                this.model.set('passengerAirFlow', data.model.get('text'));
            }
        }, this));

        // Defrost selection
        this.inputZone5Vent.on('clickLeft', _.bind(function() {
            this.model.set('defrostFront', !this.model.get('defrostFront'));
            this.render();
        }, this));

        this.inputZone5Vent.on('clickRight', _.bind(function() {
            this.model.set('defrostRear', !this.model.get('defrostRear'));
            this.render();
        }, this));
    },

    onRender: function() {
        this.renderedMainZoneView ? this.mainZoneContent.show(this.renderedMainZoneView) : this.mainZoneContent.close();
        this.backButtonZoneContent.show(this.backButtonView);
        this.homeButtonZoneContent.show(this.homeButtonView);
        this.volumeSliderZoneContent.show(this.volumeSliderView);
        this.inputZone1Content.show(this.inputZone1View);
        this.inputZone2Content.show(this.inputZone2View);
        this.inputZone3Content.show(this.inputZone3View);
        this.inputZone4Content.show(this.inputZone4View);
        this.inputZone5Content.show(this.inputZone5View);

        this.inputZone1View.$el.find('.iconLeft').toggleClass('active', this.model.get('controlMode') === 'driver');
        this.inputZone1View.$el.find('.iconRight').toggleClass('active', this.model.get('controlMode') === 'passenger');

        this.inputZone5View.$el.find('.iconLeft').toggleClass('active', this.model.get('defrostFront') === true);
        this.inputZone5View.$el.find('.iconRight').toggleClass('active', this.model.get('defrostRear') === true);
    }
});



