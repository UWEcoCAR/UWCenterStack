var EveMapMainZone = MainZoneLayout.extend({
    id: 'eveMapMainZone',

    initialize: function() {
        this.clockView = new ClockView({title: 'Eve Map'});

        this.contentView = new EveMapMainZoneView();
    },

    onShow: function() {
        this.clock.show(this.clockView);
        this.content.show(this.contentView);
    }
});