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

        var musicApp = Ext.create('feel-your-way.view.MusicMain');
        Ext.Viewport.add(musicApp);

        // var appName = Ext.create('Ext.Container', {
        //     id: 'appName',
        //     html: 'MUSIC',
        //     position: 'absolute',
        //     top: '557px',
        //     right: '160px'
        // });

        // var nowPlayingData = Ext.create('Ext.Container', {
        //     id: 'nowPlayingData',
        //     html: '',
        //     position: 'absolute',
        //     top: '5%',
        //     right: '180px'

        // });

        // //var nowPlayingData = Ext.create('Ext.')

        // pageContainer.add(musicApp);
        // pageContainer.add(appName);
        // pageContainer.add(nowPlayingData);
        //centerInfo.refresh();

    }
});
