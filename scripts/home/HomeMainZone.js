var HomeMainZone = MainZoneLayout.extend({

    initialize: function() {
        this.clockView = new ClockView({title: 'HOME'});
        this.currentTrackView = new CurrentTrackView();
        this.userView = new UserView();
    },

    onRender: function() {
        this.clock.show(this.clockView);
        this.currentTrack.show(this.currentTrackView);
        this.content.show(this.userView);
    }

});