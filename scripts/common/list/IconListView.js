var IconListView = ListView.extend({
    selection: 0,
    itemView: IconListItemView,
    className: 'iconList',

    initialize: function(options) {
        this.vent = options.vent;
        this.eventId = options.eventId;
        this.eventSource = options.eventSource;

        var self = this;

        this.vent.on(this.eventSource + ':touchMove ' + this.eventSource + ':touchStart', function(data) {
            var newSelection = Math.floor(data * (this.collection.length - 1));
            if (self.selection !== newSelection) {
                Controllers.Haptic.mainPulse();
            }
            self.selection = newSelection;
            self.redraw();
        }, this);

        this.vent.on(this.eventSource + ':touchEnd', function() {
            this.vent.trigger(self.eventId + ':select', this.collection.at(self.selection));
            self.selection = -1;
        }, this);
    },

    onRender: function() {
        this.redraw();
    },

    redraw: function() {
        this.$el.children().removeClass('active');
        this.$el.children().eq(this.selection).addClass('active');
    },

    drawCoveringLine: function() {}
});