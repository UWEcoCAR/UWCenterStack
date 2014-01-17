var ListItemCollection = Backbone.Collection.extend({

	// this way we can pass in raw objects via add, set, reset, ect..
	// and they will be converted
	model: ListItemModel
})