//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'feel-your-way': 'app'
});
//</debug>

Ext.application({
    name: 'feel-your-way',
    views: ['Main', 'Dial', 'DialSelector', 'SelectorList', 'CircleButton', 'MusicMain', 'MusicPlayer', 'CircleSlider', 'MultiDial', 'ClimateMain'],
    stores: ['Songs'],
    models: ['Song'],
    controllers: ['AppControl', 'MusicControl', 'SelectControl', 'ClimateControl'],
    requires: ['Ext.Audio'],

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        Ext.Viewport.add([Ext.create('feel-your-way.view.Main', {
            id: 'appContainer',
            fullscreen: true,
        })]);

    }
});
