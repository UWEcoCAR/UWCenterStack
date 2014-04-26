var HomeMainZone = MainZoneLayout.extend({

    onRender: function() {
        this.clock.show(new ClockView({title: 'HOME'}));
    }

});