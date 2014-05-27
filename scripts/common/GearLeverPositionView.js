var GearLeverPositionView = Backbone.Marionette.ItemView.extend({

    className: 'gearLeverPositionView',
    template: '#gearLeverPositionTemplate',

    initialize: function(options) {
        this.gearPosition = -2;
    },

    onRender: function() {
        this.redraw();
    },

    onShow:function() {
        Controllers.CanReadWriter.on('transGear', _.bind(function(gearPosition) {
            if (gearPosition !== this.gearPosition) {
                this.gearPosition = gearPosition;
                this.redraw();
            }
        }, this));
    },

    redraw: function() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        var gearLabel;
        switch (this.gearPosition) {
            case -2: gearLabel = 'P'; break;
            case -1: gearLabel = 'R'; break;
            case 0: gearLabel = 'N'; break;
            default: gearLabel = 'D'; break;
        }

        this.$el.find('.label').html(gearLabel);
        this.$el.addClass('show');
        this.timeout = setTimeout(_.bind(function() {
            this.$el.removeClass('show');
        }, this), 2000);
    }
});