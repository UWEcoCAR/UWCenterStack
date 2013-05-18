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
                html: '',
                position: 'absolute',
                top: '338px', // 169 = centered, 338 = bottom
                left: '150px',
            },
			{
                xtype: 'touchcontainer',
                id: 'dateTime',
                html: '',
                position: 'absolute',
                top: '40px',
                left: '130px',
            },

		]
	}
})