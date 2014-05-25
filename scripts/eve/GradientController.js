var GradientController = Marionette.Controller.extend({

    initialize: function() {
        this.visible = false;
        this.value = 0.5;
        this.redraw();

        setInterval(_.bind(function() {
            this.value = _.saturate(this.value + (Math.random() - 0.5) / 5, 0, 1);
            this.redraw();
        }, this), 500);
    },

    toggle: function(visible) {
        if (visible === undefined) {
            this.visible = !this.visible;
        } else {
            this.visible = visible;
        }
        this.redraw();
    },

    redraw: function() {
        $('#appContainerWrapper, .overlay')
            .toggleClass('gradientMode', this.visible)
            .css('background-position', '0% ' + this.value * 100 + '%');

    }
});