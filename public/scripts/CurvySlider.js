createCurvySlider = function(options) {
		// size variables
	var options = options || {},
		width = options.width || 400,
		height = options.height || 100,
		leftOffset = options.left || 0,
		topOffset = options.top || 0,
		diameter = options.diameter || 20,

		// dragging variables
		equation = options.equation || function(x) {
			return .5;
		},
		value = options.value || 0,
		// step = 0 || options.step,
		calculatePosition = function() {
			console.log(value, width, height, diameter, equation);
			return {
				x : value * width,
				y : equation(value) * ( height - diameter )
			}
		},
		defaultPosition = calculatePosition(),
		lastPosition = null,

		// dom element variables
		sliderClass = options.sliderClass || 'curvy-slider',
		handleClass = options.handleClass || 'curvy-slider-handle',
		container = $(document.createElement('div')),
		handle = $(document.createElement('div'));

		//
		console.log(defaultPosition);


		container
			.addClass(sliderClass)
			.css('width', width + 'px')
			.css('height', height + 'px')
			.css('top', topOffset + 'px')
			.css('left', leftOffset + 'px')
			.append(
				handle
					.addClass(handleClass)
					.css('width', diameter + 'px')
					.css('height', diameter + 'px')
					.css('left', defaultPosition.x + 'px')
					.css('bottom', defaultPosition.y + 'px')
					.on('touchstart', function(evt) {
						lastPosition = {
							x : evt.originalEvent.touches[0].clientX,
							y : evt.originalEvent.touches[0].clientX
						}
					})
					.on('touchmove', function(evt) {
						if (!lastPosition) return;

						var deltaX = evt.originalEvent.touches[0].clientX - lastPosition.x;

						lastPosition = {
							x : evt.originalEvent.touches[0].clientX,
							y : evt.originalEvent.touches[0].clientX
						}

						var offsetX = this.offsetLeft + deltaX;
						var x = offsetX / width; // TODO take into account handle diameter
							
						// normalize
						if (x >= 1 || x <= 0) {
							x = Math.max( Math.min(x, 1), 0 )
						}
						value = x;
						var newPosition = calculatePosition();

						$(this)
							.css('left', newPosition.x)
							.css('bottom', newPosition.y);

						$(container).trigger('change', {
							value : value
						});
					})
					.on('touchend', function(evt) {
						lastPosition = null;
					})
			)


		return $(container);
}