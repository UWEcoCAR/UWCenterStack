Ext.define('UWCenterStack.store.Songs', {
	extend: 'Ext.data.Store',
	config: {
		model: 'UWCenterStack.model.Song',
		autoLoad: true,

		proxy: {
			type: 'ajax',
			url: 'resources/songs.json',
			reader: {
				type: 'json',
				rootProperty: 'songs'
			}
		}
	}
});