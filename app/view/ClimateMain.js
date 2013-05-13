Ext.define('feel-your-way.view.ClimateMain', {
	extend: 'Ext.Container',
	requires: ['Ext.Button'],
	xtype: 'climatemain',

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
	                margin: 3,
	                height: '90px',
	                width: '90px'
	            },
	            items: [
	                {
	                    id: 'climateHomeButton',
	                    name: 'goHome'
	                },
	                {
	                    id: 'tempButton',
	                    text: 'Temp'
	                },
	                {
	                    id: 'fanButton',
	                    text: 'Fan'
	                },
	                {
	                    id: 'seatButton',
	                    text: 'Seats'
	                },
	                {
	                    id: 'ventButton',
	                    text: 'Vent'
	                }
	            ]
			},
			{
				xtype: 'dialselector',
				id: 'climate',
				position: 'absolute',
				left: '60%',
				top: '0px',
				width: '90%'
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
	                    id: 'passDriverSwitch',
	                    text: 'Driver/Pass'
	                },
	                {
	                    id: 'acButton',
	                    text: 'A/C'
	                },
	                {
	                    id: 'defrostButton',
	                    text: 'Defrost'
	                },
	                {
	                    id: 'circulateButton',
	                    text: 'Circulate'
	                },
	                {
	                    id: 'autoButton',
	                    text: 'AUTO'
	                }
	            ]
			}
		]
	}
})