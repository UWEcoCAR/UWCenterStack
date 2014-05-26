var CurrentTrackView = Backbone.Marionette.ItemView.extend({
    template: '#currentTrackTemplate',


    initialize: function() {
        this.filterState = false;
    },

    onBeforeRender: function() {
        if (this.filterState) {
            return;
        }

        // show state of song currently playing unless currently filtering
        if (Controllers.Music.isPlaying()) {
            this.model = Controllers.Music.getTrack().model;
        } else {
            this.model = new TrackModel();
        }
    },

    onShow: function() {
        this.listenTo(Controllers.Music, 'start next previous stop', function(track) {
            this.render();
        });
    }
});