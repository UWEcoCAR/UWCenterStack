var HomeMainZone = MainZoneLayout.extend({

    initialize: function() {
        this.clockView = new ClockView({title: 'HOME'});
        this.currentTrackView = new CurrentTrackView();
    },

    onRender: function() {
        this.clock.show(this.clockView);
        this.currentTrack.show(this.currentTrackView);
    }

});