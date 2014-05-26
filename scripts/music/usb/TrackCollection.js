var TrackCollection = Backbone.Collection.extend({
    model: TrackModel,

    comparator: function(track) {
        return track.get('name');
    }
});