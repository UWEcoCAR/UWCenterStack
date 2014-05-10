var MusicUSBMainZone = MainZoneLayout.extend({
    id: 'musicUSBMainZone',

    initialize: function() {
        this.clockView = new ClockView({title: 'MUSIC USB'});
        this.currentTrackView = new CurrentTrackView();
    },

    onRender: function() {
        this.clock.show(this.clockView);
        this.currentTrack.show(this.currentTrackView);
    }

});