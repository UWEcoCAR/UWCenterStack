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
    controllers: ['MusicControl', 'SelectControl', 'ClimateControl'],
    requires: ['Ext.Audio'],

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

//        
//        var climateApp = Ext.create('feel-your-way.view.ClimateMain', {
//            id: 'pageContainer',
//            fullscreen: true,
//        });
//        Ext.Viewport.add([climateApp]); // TODO dont add audio if music is playing!
//        var mainView = Ext.ComponentQuery.query('#appContainer')[0];
//        Ext.Viewport.remove(mainView, true);
//        
        Ext.Viewport.add([Ext.create('feel-your-way.view.ClimateMain', {
            id: 'pageContainer',
            fullscreen: true,
        });]);

    }
});
