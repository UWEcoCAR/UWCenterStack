var VehicleMonitorMainZone = MainZoneLayout.extend({
    id: 'vehicleMonitorMainZone',

    initialize: function() {
        this.clockView = new ClockView({title: 'VEHICLE MONITOR'});
        this.contentView = new VehicleMonitorMainZoneView({model: this.model});
    },

    onShow: function() {
        this.clock.show(this.clockView);
        this.content.show(this.contentView);
    }

});
