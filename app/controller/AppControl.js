Ext.define('feel-your-way.controller.AppControl', {
	extend: 'Ext.app.Controller',

	config: {
		control: {
            musicAppButton: {
            	tap: 'openMusic'
            },
            climateAppButton: {
            	tap: 'openClimate'
            }
		},

		refs: {
            view: '#view',
            musicAppButton: '#musicAppButton',
            climateAppButton: '#climateAppButton',
            diagnosticsAppButton: '#diagnosticsAppButton',
            moreAppsButton: 'appsButton'
		},
	},

	openMusic: function() {
		var musicApp = Ext.create('feel-your-way.view.MusicMain',{
			id: 'musicContainer',
			fullscreen: true
		});

		this.getView().push(musicApp);
	},

	openClimate: function() {
		var climateApp = Ext.create('feel-your-way.view.ClimateMain',{
			id: 'climateContainer',
			fullscreen: true
		});

		this.getView().push(climateApp);
	}
	
});