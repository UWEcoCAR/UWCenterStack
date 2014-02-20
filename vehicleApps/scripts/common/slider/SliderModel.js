var SliderModel = Backbone.Model.extend({

	// construct with options hash to overwrite
	defaults: function() {
		return {
			value: 0,
            selection: 0
		};
	}
});