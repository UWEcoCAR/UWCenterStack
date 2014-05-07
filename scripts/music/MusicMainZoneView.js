var MusicMainZoneView = Backbone.Marionette.Layout.extend({
    template: '#musicMainZoneTemplate',

    initialize: function(options) {
        this.side = options.side;
    },

    onRender: function() {
    }
});