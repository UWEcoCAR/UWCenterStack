var ClimateControlMainZoneView = Backbone.Marionette.Layout.extend({
    template: '#climateControlMainZoneTemplate',

    initialize: function(options) {
        this.side = options.side;
    },

    onRender: function() {
        if (this.side === 'driver') {
            this.$el.find('.temp').html(this.model.get('driverTemp') + '&deg;');
            this.$el.find('.personIcon').copyIn('#driverIcon');
        } else {
            this.$el.find('.temp').html(this.model.get('passengerTemp') + '&deg;');
            this.$el.find('.personIcon').copyIn('#passengerIcon');
        }
    }
});