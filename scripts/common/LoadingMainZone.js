var LoadingMainZone = MainZoneLayout.extend({
    id: 'loadingMainZone',

    initialize: function(options) {
        this.clockView = new ClockView({title: options.title});
    },

    onRender: function() {
        var self = this;
        for (var i = 1; i <= 5; i++) {
            this.$el.find('.content').append('<div class="dot dot' + i + '"><div class="innerDot"></div></div>');
        }
        setTimeout(function() {
            self.$el.addClass('run');
        }, 1000);
    },

    onShow: function() {
        this.clock.show(this.clockView);
    }

});
