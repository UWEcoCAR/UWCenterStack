Ext.define('feel-your-way.view.MusicMain', {
	extend: 'Ext.Container',
	requires: ['Ext.Button'],

	config: {
		id: 'musicMain',
		fullscreen: true,
		layout: 'hbox',

		items: [
			{
				xtype: 'container',
				id: 'leftNav',
	            width: '130px',
	            defaults: {
	                xtype: 'button',
	                margin: 5,
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
			},
			{
				xtype: 'dialselector',
				id: 'music',
				flex: 1
			},
			{
				xtype: 'container',
				id: 'rightNav',
	            width: '130px',
	            defaults: {
	                xtype: 'button',
	                margin: 5,
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
			}
		]
	}
})