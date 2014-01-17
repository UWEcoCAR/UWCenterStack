var ListView = Backbone.View.extend({

	initialize: function(options) {
		_.defaults(this, options);

		this.$el
			.addClass('list')
			.append(
				$('<div>')
					.addClass('listScroller')
			);

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