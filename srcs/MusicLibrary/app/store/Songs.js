Ext.define('MusicLibrary.store.Songs', {
	extend: 'Ext.data.Store',
	config: {
		model: 'MusicLibrary.model.Song',

		proxy: {
			type: 'ajax',
			url: 'resources/songs.json',
			reader: {
				type: 'json',
				rootProperty: 'songs'
			}
		},
		autoLoad: true,
	}
});