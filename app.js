//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'feel-your-way': 'app'
});
//</debug>

Ext.application({
    name: 'feel-your-way',
    views: ['Dial', 'DialSelector', 'SelectorList', 'CircleButton', 'MusicMain', 'CircleSlider', 'MultiDial'],
    stores: ['Songs'],
    models: ['Song'],
    controllers: ['MusicControl', 'SelectControl'],
    requires: ['Ext.Audio'],

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var audio = Ext.create('Ext.Audio', {
            id: 'audio',
            enableControls: false,
            hidden: true,
            volume: .5
        });

        var musicApp = Ext.create('feel-your-way.view.MusicMain', {
            id: 'pageContainer',
            fullscreen: true,
        });
        
        Ext.Viewport.add([audio, musicApp]);
    }
});
