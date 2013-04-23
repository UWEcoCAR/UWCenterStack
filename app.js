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

<<<<<<< HEAD
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
=======
        var centerInfo = Ext.create('Ext.dataview.List', {
            grouped: true,
            id: 'centerInfo',
            right: '120px',
            top: '20px',
            margin: '0 0 0 0',
            store: 'Songs',
            itemTpl: '{title}',
        });

        var pageContainer = Ext.create('Ext.navigation.View', {
            id: 'pageContainer',
            fullscreen: true,
            navigationBar: false
            //title: 'My Music'
        });

        var leftNav = Ext.create('Ext.Container', {
            id: 'leftNav',
            width: '100px',
            position: 'absolute',
            left: '3px',
            defaults: {
                xtype: 'button',
                margin: '3 3 0 0',
                height: '90px',
                width: '90px'
            },
            items: [
                {
                    id: 'homeButton',
                    iconCls: 'appspurple'
                },
                {
                    id: 'artistButton',
                    iconCls: 'artistUnclicked'
                },
                {
                    id: 'albumButton',
                    iconCls: 'albumUnclicked'
                },
                {
                    id: 'songButton',
                    iconCls: 'songUnclicked'
                },
                {
                    id: 'playlistButton',
                    iconCls: 'playlistUnclicked'

                }
            ]
        });

        var rightNav = Ext.create('Ext.Container', {
            id: 'rightNav',
            width: '100px',
            position: 'absolute',
            right: '0px',
            defaults: {
                xtype: 'button',
                margin: '3 3 0 0',
                height: '90px',
                width: '90px'
            },
            items: [
                {
                    id: 'nowPlaying',
                    text: 'NOW<br />PLAYING'
                },
                {
                    id: 'trebleButton',
                    iconCls: 'trebleUnclicked'
                },
                {
                    id: 'bassButton',
                    iconCls: 'bassUnclicked'
                },
                {
                    id: 'repeatButton',
                    text: 'REPEAT',
                },
                {
                    text: 'SHUFFLE',
                    id: 'shuffleButton',
                }
            ]   
        });


/*
NO APP NAME FOR NOW
        var appName = Ext.create('Ext.Container', {
            id: 'appName',
            html: 'MUSIC',
            position: 'absolute',
            top: '557px',
            right: '160px'
        });

*/

        var nowPlayingData = Ext.create('Ext.Container', {
            id: 'nowPlayingData',
            html: '',
            position: 'absolute',
            top: '20px',
            left: '120px'

        });

        var currentlySelectingData = Ext.create('Ext.Container', {
            id: 'selectedData',
            html: '',
            position: 'absolute',
            top: '400px',
            left: '120px'
        });

        //var nowPlayingData = Ext.create('Ext.')

        pageContainer.add(leftNav);       
        pageContainer.add(centerInfo);
        pageContainer.add(rightNav);
        pageContainer.add(currentlySelectingData);
        pageContainer.add(nowPlayingData);
        //pageContainer.add(appName);
        //centerInfo.refresh(); just displays with songs first
>>>>>>> New styling, Controls for all Buttons

    }
});
