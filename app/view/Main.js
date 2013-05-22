Ext.define('UWCenterStack.view.Main', {
	extend: 'Ext.Container',
	requires: ['Ext.Button'],
	xtype: 'mainView',

	config: {
		layout: 'hbox',
		items: [
			{
				xtype: 'touchcontainer',
				id: 'leftNavHome',
	            defaults: {
	                xtype: 'button'
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
                id: 'logo',
                html: ''
            },
			{
                xtype: 'touchcontainer',
                id: 'dateTime',
                html: ''
            },

		]
	}
})