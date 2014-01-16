var SliderView = Backbone.View.extend({
		el: $(_.template(TEMPLATES.SLIDER, {})),
		
		lastPoint: undefined,

		events: {
			// Call the event handler "updateVal" when slider value changes.
			// 'slidechange' is the jquery slider widget's event type. 
			// Refer http://jqueryui.com/demos/slider/#default for information about 'slidechange'.
			'touchmove .curvySliderHandle': 'updateVal',
			'mousemove .curvySliderHandle': 'updateVal'
		},

		initialize : function() {
			this.$el
				.css('width', this.width)
				.css('height', this.height)
				.css('top', this.top)
				.css('left', this.left)
				.find('.curvySliderHandle')
					.css('width', this.diameter)
					.css('height', this.diameter);
		},

		updateVal: function(evt) {
			console.log('SliderView.updateVal');

			if (this.lastPosition) {
				var deltaX = evt.clientX - this.lastPosition,
					offsetX = evt.target.offsetLeft + deltaX,
					x = offsetX / this.width;

				// normalize x
				x = Math.max( Math.min(x , 1), 0);

				this.handleX = x * this.width;
				this.handleY = this.equation(x) * (this.height - this.diameter);

				// Calculations
				this.model.set({value : x});
			}

			this.lastPosition = evt.clientX;

		},

		render: function() {
			this.$el
				.find('.curvySliderHandle')
					.css('left', this.handleX)
					.css('top', this.handleY);

			return this;
		}
	});