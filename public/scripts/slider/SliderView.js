/*
	options that must be passed:
		model
		top
		left
		width
		height
		diameter
		equation
 */
var SliderView = Backbone.View.extend({

		lastPosition: undefined,
		handleX : undefined,
		handlyY : undefined,

		events: {
			'touchmove .curvySliderHandle': 'updateVal',
		},

		initialize : function(options) {
			// add options as properties
			_.defaults(this, options);

			// add listeners
			this.listenTo(this.model, 'change', this.render);

			// setup derived properties
			this.handleY = this.equation(this.model.get('value')) * (this.height - this.diameter);
			this.handleX = this.model.get('value') * this.width ;

			// customize dom elements
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
			evt = evt.originalEvent; // BAD JQUERY!! GO TO YOUR ROOM

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