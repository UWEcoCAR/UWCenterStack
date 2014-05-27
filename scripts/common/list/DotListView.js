var DotListView = ListView.extend({
    numDots: 5,
    selection: -1000,
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
        this.vent.on(this.eventSource + ':touchMove ' + this.eventSource + ':touchStart', function(data) {
            var newSelection = Math.round(data * this.numLevels);
            if (Math.round(self.selection / self.numLevels * self.numDots) !== Math.round(newSelection / self.numLevels * self.numDots)) {
                Controllers.Haptic.mainPulse();
            }
            self.selection = newSelection;
            self.render();
        }, this);

        this.vent.on(this.eventSource + ':touchEnd', function() {
            self.vent.trigger(self.eventId + ':select', self.selection);
            self.selection = -1000;
        }, this);
    },

    onBeforeRender: function() {
        var self = this;
        this.collection.forEach(function(dot, index) {
            if (Math.round(self.selection / self.numLevels * self.numDots) > index) {
                dot.set('state', 'filled');
            } else {
                dot.set('state', 'empty');
            }
        });
    },

    redraw: function() {},

    drawCoveringLine: function() {}
});