/**
 * View for climate control home screen
 */
ClimateHomeScreen = ScreenLayout.extend({

    initialize: function(options) {

        // back/home button defaults
        this.backgroundIconView = new BackgroundIconView({icon: '#fanIcon'});
        this.backButtonView = new BackButtonView();
        this.homeButtonView = new HomeButtonView();

        this.vent = _.extend({}, Backbone.Events);

        this.playPauseButtonView = new PreviousButtonView();
        this.nextButtonView = new NextButtonView({vent: this.vent});
        
        // volume slider
        this.volumeSliderView = new VolumeSliderView({eventId: 'volume', viewId: '', vent: this.vent});
        
        // driver/passenger and defrost choices
        this.inputZone1View = new SliderButtonsView({
            eventId: 'inputZone1',
            iconLeft: '#driverIcon',
            iconRight: '#passengerIcon',
            eventCatcher: '#inputZone1EventCatcher',
            vent: this.vent
        });
        this.inputZone5View = new SliderButtonsView({
            eventId: 'inputZone5',
            iconLeft: '#defrostFrontIcon',
            iconRight: '#defrostRearIcon',
            eventCatcher: '#inputZone5EventCatcher',
            vent: this.vent
        });

        // collection and view of temperatures
        var temperatureCollection = new Backbone.Collection([]);
        this.temperatureListView = new ListView({
            eventId: 'temperatureList',
            eventSource: 'inputZone2',
            collection: temperatureCollection,
            vent: this.vent,
            numLevels: 26
        });
        temperatureCollection.push({text: 'AC'});
        for (var i = 60; i <= 85; i++) {
            temperatureCollection.push({text: i});
        }

        // collection and view of fan speeds
        var fanSpeedCollection = new Backbone.Collection([]);
        this.fanSpeedListView = new DotListView({
            eventId: 'fanSpeedList',
            eventSource: 'inputZone3',
            collection: fanSpeedCollection,
            vent: this.vent,
            numLevels: 25
        });
        for (var j = 0; j <= 100; j+=4) {
            fanSpeedCollection.push({text: j});
        }

        // collection and view of air flow directions
        var airFlowCollection = new Backbone.Collection([
            new IconModel({name: 'both', selector: '#driverAirFlowBothIcon'}),
            new IconModel({name: 'face', selector: '#driverAirFlowFaceIcon'}),
            new IconModel({name: 'feet', selector: '#driverAirFlowFeetIcon'}),
            new IconModel({name: 'none', selector: '#driverIcon'})
        ]);
        this.airFlowListView = new IconListView({
            eventId: 'airFlowList',
            eventSource: 'inputZone4',
            collection: airFlowCollection,
            vent: this.vent
        });

        // temperature, fan, and airflow sliders
        this.inputZone2View = new SliderView({
            eventId: 'inputZone2',
            iconLeft: "#temperatureIcon",
            eventCatcher: "#inputZone2EventCatcher",
            vent: this.vent
        });
        this.inputZone3View = new SliderView({
            eventId: 'inputZone3',
            iconLeft: "#fanIcon",
            eventCatcher: "#inputZone3EventCatcher",
            vent: this.vent
        });
        this.inputZone4View = new SliderView({
            eventId: 'inputZone4',
            iconLeft: "#airControlIcon",
            eventCatcher: "#inputZone4EventCatcher",
            vent: this.vent
        });

        // default main zone view of climte control
        this.mainZoneView = new ClimateControlMainZone({ model: this.model });
    },

    onRender: function() {
        this.mainZoneContent.show(this.mainZoneView);
        this.backgroundIconContent.show(this.backgroundIconView);
        this.backButtonZoneContent.show(this.backButtonView);
        this.homeButtonZoneContent.show(this.homeButtonView);
        this.volumeSliderZoneContent.show(this.volumeSliderView);

        this.playPauseButtonZoneContent.show(this.playPauseButtonView);
        this.nextButtonZoneContent.show(this.nextButtonView);

        this.inputZone1Content.show(this.inputZone1View);
        this.inputZone2Content.show(this.inputZone2View);
        this.inputZone3Content.show(this.inputZone3View);
        this.inputZone4Content.show(this.inputZone4View);
        this.inputZone5Content.show(this.inputZone5View);

        this.redraw();
    },

    onBeforeClose: function() {
        this.vent.off();
    },

    redraw: function() {
        this.inputZone1View.$el.find('.iconLeft').toggleClass('active', this.model.get('controlMode') === 'driver');
        this.inputZone1View.$el.find('.iconRight').toggleClass('active', this.model.get('controlMode') === 'passenger');

        this.inputZone5View.$el.find('.iconLeft').toggleClass('active', this.model.get('defrostFront') === true);
        this.inputZone5View.$el.find('.iconRight').toggleClass('active', this.model.get('defrostRear') === true);
    },

    onShow: function() {

        // starting to slide the sliders
        this.vent.on('inputZone2:touchStart', function() {
            this.mainZoneContent.show(this.temperatureListView);
            this.backgroundIconContent.show(new BackgroundIconView({icon: '#temperatureIcon'}));
        }, this);

        this.vent.on('inputZone3:touchStart', function() {
            this.mainZoneContent.show(this.fanSpeedListView);
            this.backgroundIconContent.show(new BackgroundIconView({icon: '#fanIcon'}));
        }, this);

        this.vent.on('inputZone4:touchStart', function() {
            this.mainZoneContent.show(this.airFlowListView);
            this.backgroundIconContent.show(new BackgroundIconView({icon: '#airFlowIcon'}));
        }, this);

        // updating model after temperature selection
        this.vent.on('temperatureList:select', function(data, selection) {

            var temp = data.model.get('text');
            var tempPercent = Math.round(((Number(temp) - 60)/30) * 100);
            if (selection === 0) {
                canReadWriter.write('hvACOn', 1);
                this.model.set('ac', 1);
                this.model.set('driverTemp', temp);
                this.model.set('passengerTemp', temp);
            } else if (this.model.get('ac') === 1) {
                canReadWriter.write('hvACOn', 0);
                this.model.set('ac', 0);
                this.model.set('driverTemp', temp);
                canReadWriter.write('driverTemp', tempPercent);
                this.model.set('passengerTemp', temp);
                canReadWriter.write('passengerTemp', tempPercent);
            } else {    
                if (this.model.get('controlMode') === 'driver') {
                    this.model.set('driverTemp', temp);
                    canReadWriter.write('driverTemp', tempPercent);
                } else {
                    this.model.set('passengerTemp', temp);
                    canReadWriter.write('passengerTemp', tempPercent);
                }
            }
        }, this);

        // updating model after fan speed selection
        this.vent.on('fanSpeedList:select ', function(data) {
            this.model.set('ventFanSpeed', data);
            canReadWriter.write('ventFanSpeed', this.model.get('ventFanSpeed'));
        }, this);

        // updating model after air flow selection
        this.vent.on('airFlowList:select', function(iconModel) {
            if (this.model.get('controlMode') === 'driver') {
                this.model.set('driverAirFlow', iconModel.get('name'));
            } else {
                this.model.set('passengerAirFlow', iconModel.get('name'));
            }
        }, this);

        // updatie main view back to default climate control view after sliders have been used
        this.vent.on('inputZone2:touchEnd inputZone3:touchEnd inputZone4:touchEnd', function() {
            this.mainZoneContent.show(this.mainZoneView);
            this.backgroundIconContent.show(this.backgroundIconView);
        }, this);

        // updating model after driver/passenger selection
        this.vent.on('inputZone1:clickLeft', function() {
            this.model.set('controlMode', 'driver');
            this.redraw();
        }, this);
        this.vent.on('inputZone1:clickRight', function() {
            this.model.set('controlMode', 'passenger');
            this.redraw();
        }, this);

        // updating model after defrost selection
        this.vent.on('inputZone5:clickLeft', function() {
            this.model.set('defrostFront', !this.model.get('defrostFront'));
            this.redraw();
        }, this);
        this.vent.on('inputZone5:clickRight', function() {
            this.model.set('defrostRear', !this.model.get('defrostRear'));
            this.redraw();
        }, this);
    }

});



