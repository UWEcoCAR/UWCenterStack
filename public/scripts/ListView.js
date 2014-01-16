var ListView = Backbone.View.extend({
	el: $(_.template(TEMPLATES.LIST, {})),

	initialize: function(options) {
		this.data = options.data;
		this.slider = options.slider;

		this.listenTo(this.data, 'add', this.addOne);
		this.listenTo(this.data, 'all', this.render);
		this.listenTo(this.slider, 'change', this.render);
	},

	render: function() {
		var listScroller = this.$el.find('.listScroller');
		listScroller.css('top', - this.slider.get('value') * listScroller.height());

		return this;
	},

	addOne: function(listItem) {
		var view = new ListItemView({model: listItem});
		this.$el.find('.listScroller').append(view.render().$el);
	}
}); 