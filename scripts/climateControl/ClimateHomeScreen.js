/**
 * View for climate control home screen
 */
ClimateHomeScreen = ScreenLayout.extend({

    initialize: function(options) {

        window.model = this.model;

        // back/home button defaults
        this.backButtonView = new BackButtonView();
        this.homeButtonView = new HomeButtonView();

        this.vent = _.extend({}, Backbone.Events);
        
        // volume slider
        this.volumeSliderView = new VolumeSliderView();
        
        // driver/passenger and defrost choices
        this.inputZone1View = new SliderButtonsView({
            eventId: 'inputZone1',
            iconLeft: '#driverIcon',
            iconRight: '#passengerIcon',
            eventCatcher: '#inputZone1EventCatcher',
            viewId: '',
            vent: this.vent
        });
        this.inputZone5View = new SliderButtonsView({
            eventId: 'inputZone5',
            iconLeft: '#defrostFrontIcon',
            iconRight: '#defrostRearIcon',
            eventCatcher: '#inputZone5EventCatcher',
            viewId: '',
            vent: this.vent
        });

        // collection and view of temperatures
        var temperatureCollection = new Backbone.Collection([]);
        this.temperatureListView = new ListView({
            eventId: 'temperatureList',
            eventSource: 'inputZone2',
            collection: temperatureCollection,
            viewId: '',
            vent: this.vent,
            numLevels: 25
        });
        for (var i = 60; i <= 85; i++) {
            temperatureCollection.push({text: i});
        }

        // collection and view of fan speeds
        var fanSpeedCollection = new Backbone.Collection([]);
        this.fanSpeedListView = new DotListView({
            eventId: 'fanSpeedList',
            eventSource: 'inputZone3',
            collection: fanSpeedCollection,
            viewId: '',
            vent: this.vent,
            numLevels: 25
        });
        for (var j = 0; j <= 100; j+=4) {
            fanSpeedCollection.push({text: j});
        }

        // temperature, fan, and airflow sliders
        this.inputZone2View = new SliderView({
            eventId: 'inputZone2',
            iconLeft: "#temperatureIcon",
            eventCatcher: "#inputZone2EventCatcher",
            viewId: '',
            vent: this.vent
        });
        this.inputZone3View = new SliderView({
            eventId: 'inputZone3',
            iconLeft: "#fanIcon",
            eventCatcher: "#inputZone3EventCatcher",
            viewId: '',
            vent: this.vent
        });
        this.inputZone4View = new SliderView({
            eventId: 'inputZone4',
            iconLeft: "#airControlIcon",
            eventCatcher: "#inputZone4EventCatcher",
            viewId: '',
            vent: this.vent
        });

        // default main zone view of climte control
        this.renderedMainZoneView = this.mainZoneView = new ClimateControlMainZone({ model: this.model });
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
    },

    onBeforeClose: function() {
        this.vent.off();
    },

    onShow: function() {

        var self = this;

        // starting to slide the sliders
        this.vent.on('inputZone2:touchStart', function() {
            self.renderedMainZoneView = self.temperatureListView; 
            self.render();
        }, this);

        this.vent.on('inputZone3:touchStart', function() {
            self.renderedMainZoneView = self.fanSpeedListView;
            self.render();
        }, this);

        // updating model after temperature selection
        this.vent.on('temperatureList:select', function(data) {
            var temp = Number(data.model.get('text'));
            var tempPercent = Math.round(((temp - 60)/30) * 100);
            if (self.model.get('controlMode') === 'driver') {
                self.model.set('driverTemp', temp);
                //canReadWriter.write('driverTemp', tempPercent);
            } else {
                self.model.set('passengerTemp', temp);
                //canReadWriter.write('passengerTemp', tempPercent);
            }
        }, this);

        this.vent.on('fanSpeedList:select ', function(data) {
            self.model.set('ventFanSpeed', data);
            //canReadWriter.write('ventFanSpeed', ventFanSpeed);
        }, this);

        // updatie main view back to default climate control view after sliders have been used
        this.vent.on('inputZone2:touchEnd inputZone3:touchEnd', function() {
            self.renderedMainZoneView = self.mainZoneView;
            self.render();
        }, this);

        // updating model after driver/passenger selection
        this.vent.on('inputZone1:clickLeft', function() {
            self.model.set('controlMode', 'driver');
            self.render();
        }, this);
        this.vent.on('inputZone1:clickRight', function() {
            self.model.set('controlMode', 'passenger');
            self.render();
        }, this);

        // updating model after defros selection
        this.vent.on('inputZone5:clickLeft', function() {
            self.model.set('defrostFront', !self.model.get('defrostFront'));
            self.render();
        }, this);
        this.vent.on('inputZone5:clickRight', function() {
            self.model.set('defrostRear', !self.model.get('defrostRear'));
            self.render();
        }, this);
    }

});



