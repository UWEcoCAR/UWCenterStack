Ext.define('feel-your-way.view.MusicMain', {
	extend: 'Ext.Container',
	requires: ['Ext.Button'],

	config: {
		layout: 'hbox',
		items: [
			{
				xtype: 'container',
				id: 'leftNav',
	            width: '100px',
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
			},
			{
				xtype: 'dialselector',
				id: 'music',
				flex: 1
			},
			{
				xtype: 'container',
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
			}
		]
	}
})