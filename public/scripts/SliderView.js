var SliderView = Backbone.View.extend({

		lastPosition: undefined,
		handleX : undefined,
		handlyY : undefined,

		events: {
			// Call the event handler "updateVal" when slider value changes.
			// 'slidechange' is the jquery slider widget's event type. 
			// Refer http://jqueryui.com/demos/slider/#default for information about 'slidechange'.
			'touchmove .curvySliderHandle': 'updateVal',
		},

		initialize : function(options) {
			_.defaults(this, options);

			this.handleY = this.equation(this.defaultValue) * (this.height - this.diameter);
			this.handleX = this.defaultValue * this.width ;

			this.$el
				.addClass('curvySlider')
				.css('width', this.width + 'px')
				.css('height', this.height + 'px')
				.css('top', this.top + 'px')
				.css('left', this.left + 'px')
				.append(
					$('<div>')
						.addClass('curvySliderHandle')
						.css('width', this.diameter)
						.css('height', this.diameter)
				)
		},

		updateVal: function(evt) {
			console.log('SliderView.updateVal');

			evt = evt.originalEvent;


			if (this.lastPosition !== undefined) {

				var deltaX = evt.touches[0].clientX - this.lastPosition,
					offsetX = evt.target.offsetLeft + deltaX,
					x = offsetX / this.width;

				// normalize x
				x = Math.max( Math.min(x , 1), 0);

				this.handleX = x * this.width;
				this.handleY = this.equation(x) * (this.height - this.diameter);

				// Calculations
				this.model.set({value : x});

				this.render();
			}

			this.lastPosition = evt.touches[0].clientX;

		},

		render: function() {
			this.$el
				.find('.curvySliderHandle')
					.css('left', this.handleX)
					.css('top', this.handleY);

			return this;
		}
	});