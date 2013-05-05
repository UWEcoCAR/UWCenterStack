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
			{
                xtype: 'container',
                id: 'dateTime',
                html: '',
                position: 'absolute',
                top: '40px',
                left: '130px',
            },
		]
	}
})