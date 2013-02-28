//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'UWCenterStack': 'app'
});
//</debug>

Ext.application({
    name: 'UWCenterStack',
    stores: ['Songs'],
    models: ['Song'],
    controllers: ['MusicControl'],
    views: ['CircleSlider', 'MusicPlayer'],

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var volumeContainer = Ext.create('UWCenterStack.view.MusicPlayer', {
            id: 'main'
        });

        // Initialize the main view
        Ext.Viewport.add(volumeContainer);
    }
});
