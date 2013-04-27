//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'feel-your-way': 'app'
});
//</debug>

Ext.application({
    name: 'feel-your-way',
    views: ['Dial', 'DialSelector', 'SelectorList', 'CircleButton', 'MusicMain', 'CircleSlider', 'MusicPlayer'],
    stores: ['Songs'],
    models: ['Song'],
    controllers: ['MusicControl'],

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var musicApp = Ext.create('feel-your-way.view.MusicMain', {
            id: 'pageContainer',
            fullscreen: true,
        });
        
        Ext.Viewport.add(musicApp);

        var nowPlayingData = Ext.create('Ext.Container', {
            id: 'nowPlayingData',
            html: '',
            position: 'absolute',
            top: '10px',
            left: '120px'
        });

        var selectedData = Ext.create('Ext.Container', {
            id: 'selectedData',
            html: '',
            position: 'absolute',
            top: '400px',
            left: '120px'
        });

        Ext.Viewport.add(nowPlayingData);
        Ext.Viewport.add(selectedData);
    }
});
