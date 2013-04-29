Ext.define('feel-your-way.view.MusicMain', {
	extend: 'Ext.Container',
	requires: ['Ext.Button'],

	config: {
		layout: 'hbox',
		items: [
			{
				xtype: 'container',
				id: 'leftNav',
				position: 'absolute',
				top: '0px',
				left: '0px',
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
				xtype: 'container',
				id: 'nowPlayingData',
	            html: '',
	            position: 'absolute',
	            top: '10px',
	            left: '120px',
			},
			{
				xtype: 'container',
				id: 'selectedData',
	            html: '',
	            position: 'absolute',
	            top: '170px',
	            left: '47%',
	            width: '10%'
			},
			{
				xtype: 'dialselector',
				id: 'music',
				position: 'absolute',
				left: '60%',
				top: '0px',
				width: '90%'
			},
			{
				xtype: 'container',
				id: 'fadeImage',
	            html: '',
	            position: 'absolute',
	            top: '0px',
	            right: '0px',
	            width: '200px',
	            height: '100%'
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
	                    text: 'Now<br />Playing'
	                },
	                {
	                    id: 'trebleButton',
	                    iconCls: 'treble',
	                    text: 'Treble'
	                },
	                {
	                    id: 'bassButton',
	                    iconCls: 'bass',
	                    text: 'Bass'
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