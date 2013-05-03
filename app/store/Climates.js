Ext.define('feel-your-way.store.Climates', {
	extend: 'Ext.data.Store',
	model: 'Climate',
	config: {
		model: 'feel-your-way.model.Climate',
		proxy: {
			type: 'ajax',
			url: 'resources/climate/climateData.json',
			reader: {
				type: 'json',
				rootProperty: 'temp'
			}
		},
		autoLoad: true
	},

	// can be temp, fan, seat, or vent
	loadData: function(data) {
		var store = Ext.StoreManager.get('Climate');
		store.setProxy({
			type: 'ajax',
			url: 'resources/climate/climateData.json',
			reader: {
				type: 'json',
				rootProperty: data
			}
		});
	}
});