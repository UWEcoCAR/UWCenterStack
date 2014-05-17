var CurrentTrackView = Backbone.Marionette.ItemView.extend({
    template: '#currentTrackTemplate',


    initialize: function() {
    	this.filterState = false;
    },

    onBeforeRender: function() {

    	// show state of song currently playing unless currently filtering
    	if (Controllers.Music.isPlaying() && !this.filterState) {
    		this.model = Controllers.Music.getTrack().model;
    	} else if (!this.model) {
    		this.model = new TrackModel();
    	} 
    },

    onShow: function() {
        this.listenTo(Controllers.Music, 'start next stop', function(track) {
            this.render();
        });
    }
});