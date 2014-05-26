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
        this.vent.on(this.eventSource + ':clickMove ' + this.eventSource + ':touchMove ' + this.eventSource + ':clickStart '  + this.eventSource + ':touchStart', function(data) {
            self.selection = Math.min(Math.round((this.numLevels+1) * data), this.numLevels);
            self.redraw();
        }, this);

        this.vent.on(this.eventSource  + ':clickEnd ' + this.eventSource + ':touchEnd', function() {
            self.vent.trigger(self.eventId + ':select', self.children.findByIndex(self.selection), self.selection);
        }, this);
    },

    redraw: function() {
        var listItems = this.$el.children();
        this.$el.find('.selected').removeClass('selected');
        listItems.eq(this.selection).addClass('selected');
        this.$el.css('top', - this.selection * this.itemHeight);
    },

    onShow: function() {
        this.redraw();
        this.drawCoveringLine();
        _.defer(_.bind(function() {this.$el.addClass('fadeIn');}, this));
    },

    drawCoveringLine: function() {
        this.$el.siblings('.coveringLine').remove();
        var line = $('<div>').addClass('coveringLine').copyIn('#line');
        line.find('#line').width(this.$el.width() + 14);
        this.$el.after(line);
        _.defer(function() {line.addClass('fadeIn');});
    }

    // Still needs work
//    close: function() {
//        console.log('close');
//        this.$el.removeClass('fadeIn');
//        setTimeout(_.bind(function() {
//            console.log('closeLater');
//            Backbone.Marionette.CollectionView.prototype.close.apply(this);
//        }, this), 1000);
//    }
});