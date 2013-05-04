Ext.define('feel-your-way.view.Main', {
	extend: 'Ext.Container',
	requires: ['Ext.Button'],
	xtype: 'mainView',

	config: {
		layout: 'hbox',
		items: [
			{
				xtype: 'container',
				id: 'homeLeftNav',
				position: 'absolute',
				top: '0px',
				left: '0px',
	            width: '100px',
	            defaults: {
	                xtype: 'button',
	                margin: 3,
	                height: '90px',
	                width: '90px'
	            },
	            items: [
	                {
	                    id: 'alreadyHome',
	                    cls: 'clickedButton'
	                },
	                {
	                    id: 'musicAppButton',
	                    iconCls: 'musicApp',
	                    handler: function() {
	                        var audio = Ext.create('Ext.Audio', {
	                            id: 'audio',
	                            enableControls: false,
	                            hidden: true,
	                            volume: .5
	                        });
//
//	                        var isMusic = Ext.ControllerManager.get('MusicControl');
//	                        isMusic.getIsMusicApp().set(true);
//	                        
	                        var musicApp = Ext.create('feel-your-way.view.MusicMain', {
	                            id: 'musicContainer',
	                            fullscreen: true,
	                        });
	                        Ext.Viewport.add([audio, musicApp]); // TODO dont add audio if music is playing!
	                        var mainView = Ext.ComponentQuery.query('#appContainer')[0];
	                        Ext.Viewport.remove(mainView, true);
	                    }
	                },
	                {
	                    id: 'climateAppButton',
	                    iconCls: 'climateApp',
	                    handler: function() {
	                        var climateApp = Ext.create('feel-your-way.view.ClimateMain', {
	                            id: 'climateContainer',
	                            fullscreen: true,
	                        });
	                        Ext.Viewport.add([climateApp]); // TODO dont add audio if music is playing!
	                        Ext.Viewport.setActiveItem(climateApp);
	                        var mainView = Ext.ComponentQuery.query('#appContainer')[0];
	                        Ext.Viewport.remove(mainView, true);
	                    }
	                },
	                {
	                    id: 'diagnosticsAppButton',
	                    iconCls: 'diagnosticsApp'
	                },
	                {
	                    id: 'appsButton',
	                    iconCls: 'moreApps'

	                }
	            ]
			},
//			{
//				xtype: 'container',
//				id: 'nowPlayingData',
//	            html: '',
//	            position: 'absolute',
//	            top: '10px',
//	            left: '120px',
//			},
//			{
//				xtype: 'container',
//				id: 'homeRightNav',
//	            width: '100px',
//	            position: 'absolute',
//	            right: '0px',
//	            defaults: {
//	                xtype: 'button',
//	                margin: '3 3 0 0',
//	                height: '90px',
//	                width: '90px'
//	            },
//	            items: [
//	                {
//	                    id: '6',
////	                    text: 'Now<br />Playing'
//	                },
//	                {
//	                    id: '7',
////	                    iconCls: 'treble',
////	                    text: 'Treble'
//	                },
//	                {
//	                    id: '8',
////	                    iconCls: 'bass',
////	                    text: 'Bass'
//	                },
//	                {
//	                    id: '9',
////	                    iconCls: 'repeat'
//	                },
//	                {
//	                    id: '10',
////	                    iconCls: 'shuffle'
//	                }
//	            ]   
//			}
		]
	}
})