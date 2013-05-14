Ext.define('UWCenterStack.store.Climates', {
	extend: 'Ext.data.Store',
	config: {
		model: 'UWCenterStack.model.Climate',
		autoload: false
	},

	// can be temp, fan, seat, or vent
	loadData: function(data) {
		this.setProxy({
			type: 'ajax',
			url: 'resources/climate/climateData.json',
			reader: {
				type: 'json',
				rootProperty: data
			}
		});
		this.load();
	}
});