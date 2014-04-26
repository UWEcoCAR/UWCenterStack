ClimateControlMainZone = Backbone.Marionette.ItemView.extend({
    template: '#climateControlMainZoneTemplate',
    id: 'climateControlMainZone',

    clicked: function(data) {
        this.vent.trigger('click', data);
    },

    onRender: function() {
        this.$el.find('.icon').copyIn('#personIcon');
        this.$el.find('.tempLeft').html(this.model.get('driverTemp') + '&deg;');
        this.$el.find('.tempRight').html(this.model.get('passengerTemp') + '&deg;');
        this.$el.find('.personIconRight').copyIn('#passengerIcon');
        this.$el.find('.personIconLeft').copyIn('#driverIcon');
    }
});
