Ext.define('feel-your-way.view.ClimateMain', {
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
	                margin: 3,
	                height: '90px',
	                width: '90px'
	            },
	            items: [
	                {
	                    id: 'homeButton',
	                    iconCls: 'home'
	                },
	                {
	                    id: 'tempButton',
	                    text: 'Temp',
	                    iconCls: 'temperature'
	                },
	                {
	                    id: 'fanButton',
	                    text: 'Fan',
	                    iconCls: 'fan'
	                },
	                {
	                    id: 'seatButton',
	                    text: 'Seats',
	                    iconCls: 'seats'
	                },
	                {
	                    id: 'ventButton',
	                    text: 'Vent',
	                    iconCls: 'vents'
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
	                    text: 'PASS / DRIVE'
	                },
	                {
	                    id: 'acButton',
	                    iconCls: 'airConditioning',
	                    text: 'A/C'
	                },
	                {
	                    id: 'defrostButton',
	                    iconCls: 'defrost',
	                    text: 'Defrost'
	                },
	                {
	                    id: 'circulateButton',
	                    iconCls: 'circulate',
	                    text: 'Circulate'
	                },
	                {
	                    id: 'autoButton',
	                    iconCls: 'autoClimate',
	                    text: 'AUTO'
	                }
	            ]   
			}
		]
	}
})