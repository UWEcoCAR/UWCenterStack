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
        this.windowSizePercent = Math.round((25/500)*100);
        this.percent = 0;
    
        var self = this;
        this.vent.on(this.eventSource + ':touchMove', function(data) {

            var newPercent = Math.round(data*100);

            if (Math.floor(this.percent/this.windowSizePercent) > Math.floor(newPercent/this.windowSizePercent)) {
                // shift one window up
            } else if (Math.floor(this.percent/this.windowSizePercent) < Math.floor(newPercent/this.windowSizePercent)) {
                // shift one window down
                console.log(Math.floor(this.percent/this.windowSizePercent) + " " + Math.floor(newPercent/this.windowSizePercent));
            } else {
                // no shift necessary, in same window
                self.selection = Math.min(Math.round(self.$el.children().size() * data), this.numLevels);
            	self.render();
            }

        	this.percent = newPercent;
  			      	
        }, this);

        this.vent.on(this.eventSource + ':touchEnd', function() {
            self.vent.trigger(self.eventId + ':select', self.children.findByIndex(self.selection));
        }, this);
    },

    onRender: function() {

        var listItems = this.$el.children();
        this.$el.find('.selected').removeClass('selected');
        listItems.eq(this.selection).addClass('selected');
        this.$el.css('top', - this.selection * this.itemHeight);
    }
});