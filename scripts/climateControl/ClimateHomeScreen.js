/**
 * View for climate control home screen
 */
ClimateHomeScreen = ScreenLayout.extend({

    initialize: function() {

        window.model = this.model = new ClimateControlModel();

        this.sliderVent = _.extend({}, Backbone.Events);
        this.backButtonView = new BackButtonView();
        this.homeButtonView = new HomeButtonView();
        this.volumeSliderView = new VolumeSliderView();
        this.inputZone1View = new SliderButtonsView({id: 'inputZone1', iconLeft: "#driverIcon", iconRight: "#passengerIcon", eventCatcher: "#inputZone1EventCatcher", vent: this.sliderVent});
        
        // collection of possible temperatures
        var temperatureCollection = new Backbone.Collection([]);
        var temperatureListView = new ListView({
            id: 'inputZone2',
            collection: temperatureCollection,
            vent: this.sliderVent,
            numLevels: 25
        });
        for (var i = 60; i <= 85; i++) {
            temperatureCollection.push({text: i});
        }

        // collection of possible fan speeds
        var fanSpeedCollection = new Backbone.Collection([]);
        var fanSpeedListView = new ListView({
            id: 'inputZone3',
            collection: fanSpeedCollection,
            vent: this.sliderVent,
            numLevels: 25
        });
        for (var j = 0; j <= 100; j+=4) {
            fanSpeedCollection.push({text: j});
        }

        this.inputZone2View = new SliderView({id: 'inputZone2', view: temperatureListView, iconLeft: "#temperatureIcon", eventCatcher: "#inputZone2EventCatcher", vent: this.sliderVent});
        this.inputZone3View = new SliderView({id: 'inputZone3', view: fanSpeedListView, iconLeft: "#fanIcon", eventCatcher: "#inputZone3EventCatcher", vent: this.sliderVent});
        this.inputZone4View = new SliderView({id: 'inputZone4', labelLeft: "AIRFLOW", eventCatcher: "#inputZone4EventCatcher", vent: this.sliderVent});
        this.inputZone5View = new SliderButtonsView({id: 'inputZone5', iconLeft: "#defrostFrontIcon", iconRight: "#defrostRearIcon",eventCatcher: "#inputZone5EventCatcher", vent: this.sliderVent});
        this.renderedMainZoneView = this.mainZoneView = new ClimateControlMainZone({ model: this.model });


        // Temperature Selection
        this.sliderVent.on('inputZone2:touchStart inputZone3:touchStart', _.bind(function(data, view) {
            this.renderedMainZoneView = view;
            this.render();
        }, this));

        this.sliderVent.on('inputZone2:list:select', _.bind(function(data) {
            if (this.model.get('controlMode') === 'driver') {
                this.model.set('driverTemp', data.model.get('text'));
            } else {
                this.model.set('passengerTemp', data.model.get('text'));
            }
        }, this));

        this.sliderVent.on('inputZone2:touchEnd inputZone3:touchEnd', _.bind(function(data) {
            this.renderedMainZoneView = this.mainZoneView;
            this.render();
        }, this));

        /* Fan Speed Selection
        this.sliderVent.on('inputZone3:touchStart', _.bind(function(data) {
            this.renderedMainZoneView = this.fanSpeedListView;
            this.render();
        }, this));*/

        this.sliderVent.on('inputZone3:list:select', _.bind(function(data) {
            if (this.model.get('controlMode') === 'driver') {
                this.model.set('driverFanSpeed', data.model.get('text'));
            } else {
                this.model.set('passengerFanSpeed', data.model.get('text'));
            }
        }, this));


        // Driver-Passenger mode selection
        this.sliderVent.on('inputZone1:clickLeft', _.bind(function() {
            this.model.set('controlMode', 'driver');
            this.render();
        }, this));

        this.sliderVent.on('inputZone1:clickRight', _.bind(function() {
            this.model.set('controlMode', 'passenger');
            this.render();
        }, this));

        // Air-Flow selection
        this.sliderVent.on('inputZone4:list:select', _.bind(function(data) {
            if (this.model.get('controlMode') === 'driver') {
                this.model.set('driverAirFlow', data.model.get('text'));
            } else {
                this.model.set('passengerAirFlow', data.model.get('text'));
            }
        }, this));

        // Defrost selection
        this.sliderVent.on('inputZone5:clickLeft', _.bind(function() {
            this.model.set('defrostFront', !this.model.get('defrostFront'));
            this.render();
        }, this));

        this.sliderVent.on('inputZone5:clickRight', _.bind(function() {
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



