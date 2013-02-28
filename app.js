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
    views: ['CircleSlider'],

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var volumeContainer = Ext.create('Ext.Container', {
            fullscreen: true,
            id: 'main',
            
            items: [
                {
                    xtype: 'circleslider',
                    id: 'slider',
                    diameter: 500,

                }
            ]
        });

        // Initialize the main view
        Ext.Viewport.add(volumeContainer);
    }
});
