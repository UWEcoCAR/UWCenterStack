var ListView = Backbone.View.extend({

	initialize: function(options) {
		// add options as properties
		_.defaults(this, options);

		// add listeners
		this.listenTo(this.data, 'add', this.addOne);
		this.listenTo(this.data, 'all', this.render);
		this.listenTo(this.slider, 'change', this.render);

		// customize dom
		this.$el
			.addClass('list')
			.css('width', this.width + 'px')
			.css('height', this.height + 'px')
			.css('left', this.left + 'px')
			.css('top', this.top + 'px')
			.append(
				$('<div>')
					.addClass('listScroller')
			);
	},

	render: function() {
		var listScroller = this.$el.find('.listScroller');
		listScroller.css('top', - this.slider.get('value') * listScroller.height());

		return this;
	},

	addOne: function(listItem) {
		// create new view and force it to render, then add it to dom
		var view = new ListItemView({model: listItem}).render();
		this.$el.find('.listScroller').append(view.$el);
	}
}); 