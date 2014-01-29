var AppView = Backbone.View.extend({

	model : undefined,
	leftButtons : undefined,
	sliders : undefined,
	rightButtons : undefined,
	
	initialize : function(options) {
		// add options as properties
		_.defaults(this, options, {
			leftButtons : [],
			sliders : [],
			rightButtons : []
		});

		// make sure each slot is filled with something
		this.leftButtons = this.leftButtons.concat([null,null,null,null,null]).slice(0,5);
		this.sliders = this.sliders.concat([null,null,null,null,null]).slice(0,5);
		this.rightButtons = this.rightButtons.concat([null,null,null,null,null]).slice(0,5);


		this.listenTo(this.model, 'change', this.render);

		// TODO replace this with templating engine
		this.$el
			.addClass(this.model.get('open') ? 'open app' : 'app')
			.append(
				$('<div>')
					.addClass('app-view')
					.append(this.view.$el)
			)
			.append(
				$('<div>')
					.addClass('controls-container')
					.append(
						$('<div>')
							.addClass('buttons-container left')
							.append(
								this.leftButtons.map(function(button, index) {
									var container = $('<div>')
										.addClass('button-container');
									if (button) {
										container.append(button.$el);
									}
									return container;
								})
							),
						$('<div>')
							.addClass('sliders-container center')
							.append(
								this.sliders.map(function(button, index) {
									var container = $('<div>')
										.addClass('slider-container');

									if (button) {
										console.log(button);
										container.append(button.el);
									}
									return container;
								})
							),
						$('<div>')
							.addClass('buttons-container right')
							.append(
								this.rightButtons.map(function(button, index) {
									var container = $('<div>')
										.addClass('button-container');
									if (button) {
										container.append(button.$el);
									}
									return container;
								})
							)
					)
			);
	},

	close : function() {
		this.model.set('open', false);
	},

	render : function() {
		if (this.model.get('open')) {
			this.$el.addClass('open');
		} else {
			this.$el.removeClass('open');
		}

		return this;
	}

});