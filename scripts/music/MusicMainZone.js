var MusicMainZone = MainZoneLayout.extend({
    id: 'musicMainZone',

    initialize: function() {
        this.clockView = new ClockView({title: 'MUSIC'});
    },

    onRender: function() {
        this.clock.show(this.clockView);
    }

});
