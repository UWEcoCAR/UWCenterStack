var VehicleMonitorModel = Backbone.Model.extend({
    defaults: {
        batteryVoltage: 0.0,
        batteryCurrent: 0.0,
        batterySoc: 0.0
    }
});