var CurrentTrackView = Backbone.Marionette.ItemView.extend({
    template: '#currentTrackTemplate',

    initialize: function() {
        this.model = Controllers.Music.isPlaying() ? Controllers.Music.getTrack().model : new TrackModel();
    },

    onShow: function() {
        this.listenTo(Controllers.Music, 'playing', function(track) {
            this.model = track.model;
            this.render();
        });
        this.listenTo(Controllers.Music, 'ended', function(track) {
            this.model = new TrackModel();
            this.render();
        });
    }
});
