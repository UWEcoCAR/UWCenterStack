var CurrentTrackView = Backbone.Marionette.ItemView.extend({
    template: '#currentTrackTemplate',

    initialize: function() {
        this.model = Music.isPlaying() ? Music.getTrack().model : new TrackModel();
    },
    
    onClose: function() {
        Music.getVent().off(null, null, this);
    },

    onShow: function() {
    	Music.getVent()
            .on('playing', function(track) {
                this.model = track.model;
                this.render();
            }, this)
            .on('ended', function(track) {
                this.model = new TrackModel();
                this.render();
            }, this);
    }
});
