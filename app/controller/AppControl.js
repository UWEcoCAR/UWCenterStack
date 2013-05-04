Ext.define('feel-your-way.controller.AppControl', {
	extend: 'Ext.app.Controller',

	config: {
		control: {
            climateHomeButton: {
                tap: 'goHome',
            },
            musicHomeButton: {
                tap: 'goHome',
            }
		},

		refs: {
            // non music controls
            climateHomeButton: '#climateHomeButton',
            musicHomeButton: '#musicHomeButton'
		},
	},

	goHome: function() {
		var home = Ext.create('feel-your-way.view.Main', {
		      id: 'appContainer',
		      fullscreen: true,
		  });
		Ext.Viewport.add([home]);
//		var climateView = Ext.ComponentQuery.query('#pageContainer')[0];
//		Ext.Viewport.remove(climateView, true);
		Ext.Viewport.setActiveItem(home);
	}
});