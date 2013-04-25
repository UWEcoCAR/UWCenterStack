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
	                    iconCls: 'home'
	                },
	                {
	                    id: 'artistButton',
	                    iconCls: 'artists'
	                },
	                {
	                    id: 'albumButton',
	                    iconCls: 'albums'
	                },
	                {
	                    id: 'songButton',
	                    iconCls: 'songs'
	                },
	                {
	                    id: 'playlistButton',
	                    iconCls: 'playlists'

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
	                    iconCls: 'treble'
	                },
	                {
	                    id: 'bassButton',
	                    iconCls: 'bass'
	                },
	                {
	                    id: 'repeatButton',
	                    iconCls: 'repeat'
	                },
	                {
	                    id: 'shuffleButton',
	                    iconCls: 'shuffle'
	                }
	            ]   
			}
		]
	}
})