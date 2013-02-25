//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'MusicLibrary': 'app'
});
//</debug>

Ext.application({
    name: 'MusicLibrary',
    stores: ['Songs'],
    models: ['Song'],
    controllers: ['MusicControl'],

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var list = Ext.create('Ext.dataview.List', {
            fullscreen: true,
            store: 'Songs',
            itemTpl: '{title} - {album} - {artist} - {genre}'
        })

        // Initialize the main view
        Ext.Viewport.add(list);
    }
});
