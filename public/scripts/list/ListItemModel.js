var ListItemModel = Backbone.Model.extend({

	// overwrite by passing options on construction
	defaults: function() {
		return {
			text: ''
		}
	}	
})