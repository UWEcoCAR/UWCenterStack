var EveCostMainZone = MainZoneLayout.extend({
    id: 'eveCostMainZone',

    initialize: function() {
        this.clockView = new ClockView({title: 'Cost Graph'});

        // fake mpge collection
        var costCollection = [];
        for (var i = 0; i <= 30; i++) {
            var val = Math.floor(Math.random() * 60) + 20;
            costCollection[i] = val;
        }
        this.contentView = new EveCostMainZoneView({data: costCollection});
    },

    onShow: function() {
        this.clock.show(this.clockView);
        this.content.show(this.contentView);
    }
});