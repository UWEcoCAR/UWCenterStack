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
            width: '70%',
            //height: '50%',
            margin: '0 0 0 15%',
            store: 'Songs',
            itemTpl: '{title}',
        });

        var pageContainer = Ext.create('Ext.navigation.View', {
            id: 'pageContainer',
            fullscreen: true,
            title: 'My Music'
        });

        var leftNav = Ext.create('Ext.Container', {
            id: 'leftNav',
            width: '10%',
            position: 'absolute',
            left: '25px',
            defaults: {
                xtype: 'button',
                margin: '10 10 0 0',
                height: '100px',
                width: '100px'
            },
            items: [
                {
                    text: 'HOME'
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
            width: '10%',
            position: 'absolute',
            right: '0px',
            defaults: {
                xtype: 'button',
                margin: '10 10 0 0',
                height: '100px',
                width: '100px'
            },
            items: [
                {
                    text: 'NOW PLAYING'
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

        pageContainer.add(leftNav);       
        pageContainer.add(centerInfo);
        pageContainer.add(rightNav);
        //centerInfo.refresh();

    },
});
