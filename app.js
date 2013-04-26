//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'feel-your-way': 'app'
});
//</debug>

Ext.application({
    name: 'feel-your-way',
    views: ['Dial', 'DialSelector', 'SelectorList', 'CircleButton', 'MusicMain'],
    stores: ['Songs'],
    models: ['Song'],
    controllers: ['MusicControl'],

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // var pageContainer = Ext.create('Ext.navigation.View', {
        //     id: 'pageContainer',
        //     fullscreen: true,
        //     navigationBar: false
        //     //title: 'My Music'
        // });

        var musicApp = Ext.create('feel-your-way.view.MusicMain', {
            id: 'pageContainer',
            fullscreen: true,
        });
        
        Ext.Viewport.add(musicApp);

        // var appName = Ext.create('Ext.Container', {
        //     id: 'appName',
        //     html: 'MUSIC',
        //     position: 'absolute',
        //     top: '557px',
        //     right: '160px'
        // });

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

        // //var nowPlayingData = Ext.create('Ext.')

        // pageContainer.add(musicApp);
        // pageContainer.add(appName);
        // pageContainer.add(nowPlayingData);
        //centerInfo.refresh();
    }
});
