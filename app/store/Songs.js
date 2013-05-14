Ext.define('UWCenterStack.store.Songs', {
	extend: 'Ext.data.Store',
	config: {
		model: 'UWCenterStack.model.Song',
		sorters: 'title',
		grouper: {
			groupFn: function(record) {
				return record.get('title')[0].substr(0,1);
			},
			sort_property: 'title'
		},
		proxy: {
			type: 'ajax',
			url: 'resources/music/songMetadata.json',
			reader: {
				type: 'json',
				rootProperty: 'songs'
			}
		},
        filters: [{
            property: 'title',
            value: ''
        }], // filters
		autoLoad: true
	},

	changeSorting: function(sortBy, list) {
		var store = Ext.StoreManager.get('Songs');
		store.setSorters(sortBy);
		store.setGrouper({
			groupFn: function(record) {
				return record.get(sortBy)[0].substr(0,1);
			},
			sort_property: sortBy
		});
	}
});