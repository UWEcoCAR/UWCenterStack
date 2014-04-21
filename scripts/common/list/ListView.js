var ListView = Backbone.Marionette.CollectionView.extend({
    selection: 0,
    itemHeight: 104,
    itemView: ListItemView,
    className: 'list',

    initialize: function(options) {
        this.vent = options.vent;
        this.vent.on('slider:touchMove', _.bind(function(data) {
            this.selection = Math.round(this.$el.children().size() * data);
            this.render();
        }, this));
        this.vent.on('slider:touchEnd', _.bind(function() {
            this.vent.trigger('list:select', this.children.findByIndex(this.selection));
        }, this));
    },

    onRender: function() {
        var listItems = this.$el.children();
        this.$el.find('.selected').removeClass('selected');
        listItems.eq(this.selection).addClass('selected');
        this.$el.css('top', - this.selection * this.itemHeight);
    }
});