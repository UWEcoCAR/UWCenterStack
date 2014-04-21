var ClockView = Backbone.Marionette.ItemView.extend({
    tagName: 'div',
    id: 'clock',
    template: '#clockTemplate',

    initialize: function() {
        setInterval(_.bind(function() {
            this.render();
        }, this), 1000);
    },

    onRender: function() {
        this.$el.find('.time').html(require('moment')().format('h:mm A'));
        return this;
    }
});