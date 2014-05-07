var AlbumCollection = Backbone.Collection.extend({
    model: AlbumModel,

    comparator: function(album) {
        return album.get('name');
    }
});