//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'feel-your-way': 'app'
});
//</debug>

Ext.application({
    name: 'feel-your-way',
    stores: ['Songs'],
    models: ['Song'],
    controllers: ['MusicControl'],

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var centerInfo = Ext.create('Ext.dataview.List', {
            grouped: true,
            id: 'centerInfo',

            top: '5%',
            margin: '0 0 0 15%',
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
            width: '130px',
            position: 'absolute',
            left: '25px',
            defaults: {
                xtype: 'button',
                margin: '10 10 0 0',
                height: '120px',
                width: '120px'
            },
            items: [
                {
                    id: 'homeButton',
                    iconCls: 'appspurple'
                },
                {
                    id: 'artistButton',
                    text: 'ARTISTS',
                },
                {
                    id: 'albumButton',
                    text: 'ALBUM',
                },
                {
                    id: 'songButton',
                    text: 'SONGS',
                },
                {
                    text: 'PLAYLIST'
                }
            ]
        });

        var rightNav = Ext.create('Ext.Container', {
            id: 'rightNav',
            width: '150px',
            position: 'absolute',
            right: '0px',
            defaults: {
                xtype: 'button',
                margin: '10 10 0 0',
                height: '120px',
                width: '120px'
            },
            items: [
                {
                    id: 'nowPlaying',
                    text: 'NOW<br />PLAYING'
                },
                {
                    text: 'TREBLE',
                    handler: function() {
                        var toolbar = Ext.ComponentQuery.query('toolbar')[0];
                        toolbar.setTitle('TREBLE');
                    }
                },
                {
                    text: 'BASS',
                    handler: function() {
                        var toolbar = Ext.ComponentQuery.query('toolbar')[0];
                        toolbar.setTitle('BASS');
                    }
                },
                {
                    text: 'REPEAT',
                    handler: function() {
                        var toolbar = Ext.ComponentQuery.query('toolbar')[0];
                            // titles = ['Artist', 'Album', 'Song'],
                            // title = toolbar.getTitle().getTitle(),
                            // newTitle = titles[titles.indexOf(title) + 1] || titles[0];
                        toolbar.setTitle('REPEAT');
                    }
                },
                {
                    text: 'SHUFFLE'
                }
            ]   
        });

        var appName = Ext.create('Ext.Container', {
            id: 'appName',
            html: 'MUSIC',
            position: 'absolute',
            top: '557px',
            right: '160px'
        });

        var nowPlayingData = Ext.create('Ext.Container', {
            id: 'nowPlayingData',
            html: '',
            position: 'absolute',
            top: '5%',
            right: '180px'

        });

        //var nowPlayingData = Ext.create('Ext.')

        pageContainer.add(leftNav);       
        pageContainer.add(centerInfo);
        pageContainer.add(rightNav);
        pageContainer.add(appName);
        pageContainer.add(nowPlayingData);
        //centerInfo.refresh();

    },
});
