var ListView = Backbone.Marionette.CollectionView.extend({
    selection: 0,
    itemHeight: 104,
    itemView: ListItemView,
    className: 'list',

    initialize: function(options) {
        this.vent = options.vent;
        this.id = options.id;
        this.feature = options.feature;

        this.vent.on(this.id + ':touchMove', _.bind(function(data) {
            this.selection = Math.min(Math.round(this.$el.children().size() * data), options.numLevels);
            this.render();
        }, this));
        this.vent.on(this.id + ':touchEnd', _.bind(function() {
            this.vent.trigger(this.id + ':list:select', this.children.findByIndex(this.selection), this.feature);
        }, this));
    },

    onRender: function() {
        var listItems = this.$el.children();
        this.$el.find('.selected').removeClass('selected');
        listItems.eq(this.selection).addClass('selected');
        this.$el.css('top', - this.selection * this.itemHeight);
    }
});