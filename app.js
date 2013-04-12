//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'UWCenterStack': 'app'
});
//</debug>

Ext.application({
    name: 'UWCenterStack',
    views: ['Dial', 'DialSelector', 'SelectorList', 'CircleButton'],
    stores: ['Songs'],
    models: ['Song'],
    controllers: ['MusicControl'],

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var dial = Ext.create('UWCenterStack.view.DialSelector');

        // Initialize the main view
        Ext.Viewport.add(dial);
    }
});
