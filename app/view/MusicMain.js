Ext.define('UWCenterStack.view.MusicMain', {
	extend: 'Ext.Container',
	requires: ['Ext.Button'],
	xtype: 'musicmain',

	config: {
		layout: 'hbox',
		items: [
			{
				xtype: 'touchcontainer',
				id: 'leftNavMusic',
	            defaults: {
	                xtype: 'button',
	            },
	            items: [
	                {
	                    id: 'musicHomeButton',
	                    name: 'goHome'
	                },
	                {
	                    id: 'artistButton'
	                },
	                {
	                    id: 'albumButton'
	                },
	                {
	                    id: 'songButton'
	                },
	                {
	                    id: 'playlistButton'
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
				width: '90%',
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
				xtype: 'touchcontainer',
				id: 'rightNavMusic',
	            defaults: {
	                xtype: 'button'
	            },
	            items: [
	                {
	                    id: 'nowPlaying',
	                    text: 'Now<br />Playing'
	                },
	                {
	                    id: 'trebleButton',
	                    text: 'Treble'
	                },
	                {
	                    id: 'bassButton',
	                    text: 'Bass'
	                },
	                {
	                    id: 'repeatButton'
	                },
	                {
	                    id: 'shuffleButton'
	                }
	            ]   
			}
		]
	}
})