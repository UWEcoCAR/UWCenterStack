var ArtistCollection = Backbone.Collection.extend({
    model: ArtistModel,

    comparator: function(artist) {
        return artist.get('name');
    }
});