var MusicMainZone = MainZoneLayout.extend({
    id: 'musicMainZone',

    initialize: function() {
        this.clockView = new ClockView({title: 'MUSIC'});
        this.currentTrackView = new CurrentTrackView({model: currentTrack});
    },

    onRender: function() {
        this.clock.show(this.clockView);
        this.currentTrack.show(this.currentTrackView);
    }

});
