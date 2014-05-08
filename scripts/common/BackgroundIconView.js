var BackgroundIconView = Backbone.Marionette.ItemView.extend({
    template: '#backgroundIconTemplate',

    initialize: function(options) {
        this.icon = options.icon;
    },

    onRender: function() {
        this.$el.copyIn($(this.icon));
    }

});