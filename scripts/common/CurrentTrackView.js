var CurrentTrackView = Backbone.Marionette.ItemView.extend({
    template: '#currentTrackTemplate',

    onBeforeRender: function() {
        this.model = Controllers.Music.isPlaying() ? Controllers.Music.getTrack().model : new TrackModel();
    },

    onShow: function() {
        this.listenTo(Controllers.Music, 'start next stop', function(track) {
            this.render();
        });
    }
});
