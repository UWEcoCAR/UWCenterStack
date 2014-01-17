var ListItemView = Backbone.View.extend({

	initialize: function() {
		this.$el
			.addClass('listItem');
			
		this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		this.$el.text(this.model.get('text'));	
		return this;
	}
});