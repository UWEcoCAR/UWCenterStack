var ListView = Backbone.Marionette.CollectionView.extend({
    selection: 0,
    itemHeight: 104,
    itemView: ListItemView,
    className: 'list',

    initialize: function(options) {
        this.vent = options.vent;
        this.eventId = options.eventId;
        this.eventSource = options.eventSource;

        var self = this;

        this.vent.on(this.eventSource + ':touchMove', function(data) {
            self.selection = Math.min(Math.round(self.$el.children().size() * data), options.numLevels);
            self.render();
        });
        this.vent.on(this.eventSource + ':touchEnd', function() {
            self.vent.trigger(self.eventId + ':select', self.children.findByIndex(self.selection));
        });
    },

    onRender: function() {
        var listItems = this.$el.children();
        this.$el.find('.selected').removeClass('selected');
        listItems.eq(this.selection).addClass('selected');
        this.$el.css('top', - this.selection * this.itemHeight);
    }
});