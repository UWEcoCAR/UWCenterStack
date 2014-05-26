var EveMPGEMainZone = MainZoneLayout.extend({
    id: 'eveMPGEMainZone',

    initialize: function() {
        this.clockView = new ClockView({title: 'MPGE Graph'});

        // fake mpge collection
        var mpgeCollection = [];
        for (var i = 0; i <= 30; i++) {
            var val = Math.floor(Math.random() * 60) + 20;
            mpgeCollection[i] = val;
        }
        this.contentView = new EveMPGEMainZoneView({data: mpgeCollection});
    },

    onShow: function() {
        this.clock.show(this.clockView);
        this.content.show(this.contentView);
    }
});