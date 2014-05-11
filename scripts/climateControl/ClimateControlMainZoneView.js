var ClimateControlMainZoneView = Backbone.Marionette.Layout.extend({
    template: '#climateControlMainZoneTemplate',

    initialize: function(options) {
        this.side = options.side;
    },

    onRender: function() {
        var ventIcon;
        if (this.side === 'driver') {
            this.$el.find('.temp').html(this.model.get('driverTemp') + '&deg;');

            ventIcon = '#driverIcon';
            switch (this.model.get('driverAirFlow')) {
                case 'both': ventIcon = '#driverAirFlowBothIcon'; break;
                case 'face': ventIcon = '#driverAirFlowFaceIcon'; break;
                case 'feet': ventIcon = '#driverAirFlowFeetIcon'; break;
            }
            this.$el.find('.personIcon').copyIn(ventIcon);
        } else {
            this.$el.find('.temp').html(this.model.get('passengerTemp') + '&deg;');

            ventIcon = '#passengerIcon';
            switch (this.model.get('passengerAirFlow')) {
                case 'both': ventIcon = '#passengerAirFlowBothIcon'; break;
                case 'face': ventIcon = '#passengerAirFlowFaceIcon'; break;
                case 'feet': ventIcon = '#passengerAirFlowFeetIcon'; break;
            }
            this.$el.find('.personIcon').copyIn(ventIcon);
        }
    }
});