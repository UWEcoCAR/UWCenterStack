var IconListView = ListView.extend({
    selection: 0,
    itemView: IconListItemView,
    className: 'iconList',

    initialize: function(options) {
        this.vent = options.vent;
        this.eventId = options.eventId;
        this.eventSource = options.eventSource;

        var self = this;
        this.vent.on(this.eventSource + ':touchMove', function(data) {
            this.selection = Math.floor(data * (this.collection.length - 1));
            console.log('selection ' + this.selection);
            this.redraw();
        }, this);

        this.vent.on(this.eventSource + ':touchEnd', function() {
            this.vent.trigger(self.eventId + ':select', this.collection.at(self.selection));
        }, this);
    },

    onRender: function() {
        this.redraw();
    },

    redraw: function() {
        this.$el.children().removeClass('active');
        this.$el.children().eq(this.selection).addClass('active');
    }
});