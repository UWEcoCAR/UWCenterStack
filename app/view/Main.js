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
	                    id: 'musicAppButton'
	                },
	                {
	                    id: 'climateAppButton'
	                },
	                {
	                    id: 'diagnosticsAppButton'
	                },
	                {
	                    id: 'appsButton'
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