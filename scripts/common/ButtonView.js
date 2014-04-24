var ButtonView = Backbone.Marionette.ItemView.extend({
    template: '#buttonTemplate',

    initialize: function(options) {
        this.icon = options.icon;
        this.vent = options.vent;
        this.eventCatcher = options.eventCatcher;
        $(this.eventCatcher).click(_.bind(this.clicked, this));
    },

    clicked: function(data) {
        if (this.vent) {
            this.vent.trigger('click', data);
        }
    },

    onRender: function() {
        this.$el.find('.icon').copyIn(this.icon);
    }
});
