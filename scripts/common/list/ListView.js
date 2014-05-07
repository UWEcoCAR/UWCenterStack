var ListView = Backbone.Marionette.CollectionView.extend({
    selection: 0,
    itemHeight: 104,
    itemView: ListItemView,
    className: 'list',

    initialize: function(options) {
        this.vent = options.vent;
        this.eventId = options.eventId;
        this.eventSource = options.eventSource;
        this.numLevels = options.numLevels;
    
        var self = this;
        this.vent.on(this.eventSource + ':touchMove', function(data) {
            self.selection = Math.min(Math.round(self.$el.children().size() * data), this.numLevels);
            self.redraw();
        }, this);

        this.vent.on(this.eventSource + ':touchEnd', function() {
            self.vent.trigger(self.eventId + ':select', self.children.findByIndex(self.selection));
        }, this);
    },

    redraw: function() {
        this.onRender();
        this.$el.css('top', - this.selection * this.itemHeight);
    },

    onRender: function() {

        var listItems = this.$el.children();
        this.$el.find('.selected').removeClass('selected');
        listItems.eq(this.selection).addClass('selected');
    }
});