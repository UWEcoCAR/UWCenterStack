var DragListView = Backbone.View.extend({

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
		var sliderVal = this.slider.get('value');
		
		var move = (sliderVal != .5);
		var position = parseInt(listScroller.css('top'));
		var moveBy = (sliderVal - .5) * 20;
		if (this.oldTimer) {
			clearInterval(this.oldTimer);
		} else {
			listScroller.css('top', - this.slider.get('value') * listScroller.height());
		}
		var me = this;
		if (sliderVal != .5) {
			// move up
			this.oldTimer = setInterval(function() {
				changeListView(me, listScroller, moveBy);
			}, 20);
		}

		function changeListView(me, scroller, moveBy) {
			var scroller = me.$el.find('.listScroller');
			var newPos = Math.min(Math.max(parseInt(scroller.css('top')) - moveBy, -scroller.height() + 20), 0);
			scroller.css('top', newPos);
		};

		return this;
	},

	

	addOne: function(listItem) {
		// create new view and force it to render, then add it to dom
		var view = new ListItemView({model: listItem}).render();
		this.$el.find('.listScroller').append(view.$el);
	}
}); 