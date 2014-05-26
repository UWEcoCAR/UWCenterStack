var MusicUSBMainZone = MainZoneLayout.extend({
    id: 'musicUSBMainZone',

    initialize: function() {
        this.clockView = new ClockView({title: 'MUSIC USB'});

        var currentTrackModel = new TrackModel();

        if (this.model.get('playlist').length > 0) {
            currentTrackModel.set('artistName', this.model.get('playlist'));
    	} else {
            currentTrackModel.set('artistName', this.model.get('artist'));
            currentTrackModel.set('image', this.model.get('albumImage'));
    	}

        this.currentTrackView = new CurrentTrackView({model: currentTrackModel});

        // make sure that at least one state is being filtered, otherwise trackView
        // for song currently playing will be shown
        if (this.model.get('playlist').length>0 || this.model.get('artist').length>0 || 
        	this.model.get('albumImage').length>0) {

            this.currentTrackView.filterState = true;
        }

    },

    onRender: function() {
        this.clock.show(this.clockView);
        this.currentTrack.show(this.currentTrackView);
    }

});