CenterStack.ListItemView = Marionette.ItemView.extend({

	initialize: function() {
		// listen for changes on model
		this.listenTo(this.model, 'change', this.render);

		// customize dom
		this.$el
			.addClass('listItem');
	},

	render: function() {
		this.$el.text(this.model.get('text'));	
		return this;
	}
});