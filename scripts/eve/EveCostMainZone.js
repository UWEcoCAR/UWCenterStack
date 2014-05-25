var EveCostMainZone = MainZoneLayout.extend({
    id: 'eveCostMainZone',

    initialize: function() {
        this.clockView = new ClockView({title: 'TEMP'});

        // fake mpge collection
        var mpgeCollection = [];
        for (var i = 0; i <= 30; i++) {
            var val = Math.floor(Math.random() * 85) + 1;
            mpgeCollection[i] = val;
        }
        this.contentView = new EveCostMainZoneView({data: mpgeCollection});
    },

    onShow: function() {
        this.clock.show(this.clockView);
        this.content.show(this.contentView);
    }
});