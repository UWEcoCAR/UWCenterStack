ClimateControlModel = Backbone.Model.extend({
    defaults: {
        controlMode: 'driver',
        driverTemp: 70,
        passengerTemp: 70,
        ventFanSpeed: 25,
        driverAirFlow: 'both',
        passengerAirFlow: 'both',
        ac: 0,
        defrostFront: false,
        defrostRear: false
    }
});