var WindowListView = Backbone.Marionette.CollectionView.extend({
    selection: 0,
    itemHeight: 104,
    itemView: ListItemView,
    className: 'list',

    initialize: function(options) {
        this.vent = options.vent;
        this.eventId = options.eventId;
        this.eventSource = options.eventSource;
        this.numLevels = options.numLevels;
        this.windowSize = 24;
        this.windowStart = 0;
        this.selection = 0;
        this.windowSpeed = 25;
    
        var self = this;
        var move = 0;
        var moving = false;

        this.vent.on(this.eventSource + ':touchStart', function(data) {
        	// resume from current selection
        	this.windowStart = this.selection - Math.round(data * this.windowSize);
        }, this);

        this.vent.on(this.eventSource + ':touchMove', function(data) {

            if (data != 1 && data !== 0) {
                // no window shifting
                clearInterval(move);
                moving = false;
                self.selection = self._getValidValue(Math.round(self.windowSize * data) + this.windowStart, 0, this.numLevels-1);
                self.redraw();
            } else if (data == 1) {
                // window shifting up

                if (!moving) {
                    move = setInterval(function() {
                        self.selection = Math.min(self.selection + 1, self.numLevels - 1);
                        self.windowStart = self.selection - self.windowSize;
                        self.redraw();
                    }, self.windowSpeed);
                    moving = true;
                }
            } else {
                // window shifting down
                if (!moving) {
                    move = setInterval(function() {
                        self.windowStart = Math.max(self.windowStart - 1, 0);
                        self.selection = self.windowStart;
                        self.redraw();
                    }, self.windowSpeed);
                    moving = true;
                }
            }
        }, this);

        this.vent.on(this.eventSource + ':touchEnd', function() {
            clearInterval(move);
            moving = false;
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