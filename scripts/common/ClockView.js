var ClockView = Backbone.Marionette.ItemView.extend({
    tagName: 'div',
    id: 'clock',
    template: '#clockTemplate',

    initialize: function(options) {
        this.title = options && options.title;

        setInterval(_.bind(function() {
            this.render();
        }, this), 1000);
    },

    onRender: function() {
        this.$el.find('.time').html(require('moment')().format('h:mm A'));
        this.$el.find('.title').html(this.title);
        return this;
    }
});