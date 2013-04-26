Ext.define('feel-your-way.model.Song', {
	extend: 'Ext.data.Model',
	config: {
		fields: [
			{name: 'title', type: 'string', defaultValue: 'Unknown'},
			{name: 'artist', type: 'string', defaultValue: 'Unknown'},
			{name: 'album', type: 'string', defaultValue: 'Unknown'},
			{name: 'genre', type: 'string', defaultValue: 'Unknown'}
		],
	}
});