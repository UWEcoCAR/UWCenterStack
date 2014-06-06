var GearLeverPositionView = Backbone.Marionette.ItemView.extend({

    className: 'gearLeverPositionView',
    template: '#gearLeverPositionTemplate',

    initialize: function(options) {
        this.gearPosition = -1;
    },

    onRender: function() {
        this.redraw();
    },

    onShow:function() {
        Controllers.CanReadWriter.on('transGear', _.bind(function(gearPosition) {

            if (this.gearPosition < 0) {
                this.gearPosition = gearPosition;
                return;
            }

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
            case 1: gearLabel = 'P'; break;
            case 2: gearLabel = 'R'; break;
            case 3: gearLabel = 'N'; break;
            case 4: gearLabel = 'D'; break;
            case 5: gearLabel = 'M'; break;
            default: gearLabel = ''; break;
        }

        if (this.gearPosition > -1) {
            this.$el.find('.label').html(gearLabel);
            this.$el.addClass('show');
            this.timeout = setTimeout(_.bind(function() {
                this.$el.removeClass('show');
            }, this), 2000);
        }
    }
});