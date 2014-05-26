var InternetRadioMainZoneView = MainZoneLayout.extend({
    id: 'internetRadioMainZone',

    initialize: function() {
        this.clockView = new ClockView({title: 'INTERNET RADIO'});
        this.currentTrackView = new CurrentTrackView();
    },

    onShow: function() {
        this.clock.show(this.clockView);
        this.currentTrack.show(this.currentTrackView);
    }

});
