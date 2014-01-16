var ListItemView = Backbone.View.extend({
	el: $(_.template(TEMPLATES.LIST_ITEM, {})),

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		this.$el.text(this.model.get('text'));	
		return this;
	}
});