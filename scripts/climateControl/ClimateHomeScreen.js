/**
 * View for climate control home screen
 */
ClimateHomeScreen = ScreenLayout.extend({

    initialize: function() {

        window.model = this.model = new ClimateControlModel();

        // listens to events from climateControl sliders
        this.sliderVent = _.extend({}, Backbone.Events);
        
        // back/home button defaults
        this.backButtonView = new BackButtonView();
        this.homeButtonView = new HomeButtonView();
        
        // volume slider
        this.volumeSliderView = new VolumeSliderView();
        
        // driver/passenger and defrost choices
        this.inputZone1View = new SliderButtonsView({id: 'inputZone1', buttonLeft: "driver", buttonRight: "passenger", iconLeft: "#driverIcon", iconRight: "#passengerIcon", eventCatcher: "#inputZone1EventCatcher", vent: this.sliderVent});
        this.inputZone5View = new SliderButtonsView({id: 'inputZone5', buttonLeft: "defrostFront", buttonRight: "defrostRear", iconLeft: "#defrostFrontIcon", iconRight: "#defrostRearIcon",eventCatcher: "#inputZone5EventCatcher", vent: this.sliderVent});

        // collection and view of temperatures
        var temperatureCollection = new Backbone.Collection([]);
        var temperatureListView = new ListView({
            id: 'inputZone2',
            feature: 'Temp',
            collection: temperatureCollection,
            vent: this.sliderVent,
            numLevels: 25
        });
        for (var i = 60; i <= 85; i++) {
            temperatureCollection.push({text: i});
        }

        // collection and view of fan speeds
        var fanSpeedCollection = new Backbone.Collection([]);
        var fanSpeedListView = new ListView({
            id: 'inputZone3',
            feature: 'FanSpeed',
            collection: fanSpeedCollection,
            vent: this.sliderVent,
            numLevels: 25
        });
        for (var j = 0; j <= 100; j+=4) {
            fanSpeedCollection.push({text: j});
        }

        // temperature, fan, and airflow sliders
        this.inputZone2View = new SliderView({id: 'inputZone2', view: temperatureListView, iconLeft: "#temperatureIcon", eventCatcher: "#inputZone2EventCatcher", vent: this.sliderVent});
        this.inputZone3View = new SliderView({id: 'inputZone3', view: fanSpeedListView, iconLeft: "#fanIcon", eventCatcher: "#inputZone3EventCatcher", vent: this.sliderVent});
        this.inputZone4View = new SliderView({id: 'inputZone4', labelLeft: "AIRFLOW", eventCatcher: "#inputZone4EventCatcher", vent: this.sliderVent});

        // default main zone view of climte control
        this.renderedMainZoneView = this.mainZoneView = new ClimateControlMainZone({ model: this.model });

        // starting to slide the sliders
        this.sliderVent.on('inputZone2:touchStart inputZone3:touchStart', _.bind(function(data, view) {
            this.renderedMainZoneView = view;
            this.render();
        }, this));

        // updating model after temperature/fan speed selection
        this.sliderVent.on('inputZone2:list:select inputZone3:list:select inputZone4:list:select', _.bind(function(data, feature) {
            if (this.model.get('controlMode') === 'driver') {
                this.model.set('driver' + feature, data.model.get('text'));
            } else {
                this.model.set('passenger' + feature, data.model.get('text'));
            }
        }, this));

        // updatie main view back to default climate control view after sliders have been used
        this.sliderVent.on('inputZone2:touchEnd inputZone3:touchEnd', _.bind(function(data) {
            this.renderedMainZoneView = this.mainZoneView;
            this.render();
        }, this));

        // updating model after driver/passenger selection
        this.sliderVent.on('inputZone1:clickLeft inputZone1:clickRight', _.bind(function(data, feature) {
            this.model.set('controlMode', feature);
            this.render();
        }, this));

        // updating model after defros selection
        this.sliderVent.on('inputZone5:clickLeft inputZone5:clickRight', _.bind(function(data, feature) {
            this.model.set(feature, !this.model.get(feature));
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



