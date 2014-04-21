centerStack.ListView = Marionette.CollectionView.extend({

    itemView: centerStack.ListItemView,

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
			.append(
				$('<div>').addClass('listScroller')
			);
	},

	render: function() {
        _.defer(_.bind(function() {
            var listScroller = this.$el.find('.listScroller');
            var listItems = listScroller.children();
            var elementNumber = Math.round(this.slider.get('value') * (listItems.size() - 1));
            listScroller.find('.selected').removeClass('selected');
            listItems.eq(elementNumber).addClass('selected');
            var itemHeight = listScroller.height() / listItems.size();
            listScroller.css('top', - elementNumber * itemHeight + itemHeight);
        }, this));

        return this;
	},

	addOne: function(listItem) {
		// create new view and force it to render, then add it to dom
		var view = new ListItemView({model: listItem}).render();
		this.$el.find('.listScroller').append(view.$el);
	}
}); 