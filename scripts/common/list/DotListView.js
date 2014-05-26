var DotListView = ListView.extend({
    numDots: 5,
    selection: 0,
    itemView: DotListItemView,
    className: 'dotList',

    initialize: function(options) {
        this.collection = new Backbone.Collection();
        for (var i = 0; i < this.numDots; i++) {
            this.collection.push(new Backbone.Model({state: 'empty'}));
        }

        this.vent = options.vent;
        this.eventId = options.eventId;
        this.eventSource = options.eventSource;
        this.numLevels = 100;

        var self = this;
        this.vent.on(this.eventSource + ':touchMove', function(data) {
            self.selection = Math.round(data * this.numLevels);
            self.render();
        }, this);

        this.vent.on(this.eventSource + ':touchEnd', function() {
            self.vent.trigger(self.eventId + ':select', self.selection);
        }, this);
    },

    onBeforeRender: function() {
        var self = this;
        this.collection.forEach(function(dot, index) {
            if (Math.round(self.selection / self.numLevels * self.numDots) > index) {
                console.log('filled');
                dot.set('state', 'filled');
            } else {
                dot.set('state', 'empty');
            }
        });
    },

    redraw: function() {},

    drawCoveringLine: function() {}
});