var ClimateControlMainZone = MainZoneLayout.extend({
    id: 'climateControlMainZone',

    initialize: function() {
        this.clockView = new ClockView({title: 'CLIMATE CONTROL'});
        this.contentLeftView = new ClimateControlMainZoneView({side: 'driver', model: this.model});
        this.contentRightView = new ClimateControlMainZoneView({side: 'passenger', model: this.model});
    },

    onRender: function() {
        this.clock.show(this.clockView);
        this.contentLeft.show(this.contentLeftView);
        this.contentRight.show(this.contentRightView);
    }

});
