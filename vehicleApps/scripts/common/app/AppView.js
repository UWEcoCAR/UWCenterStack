var AppView = Backbone.View.extend({

	template : _.template('<div class="homeButton"></div>' +
        '<div class="content"></div>' +
        '<div class="inputZone1"></div>' +
        '<div class="inputZone2"></div>' +
        '<div class="inputZone3"></div>' +
        '<div class="inputZone4"></div>' +
        '<div class="inputZone5"></div>' +
        '<div class="footer"></div>'),

    className : 'app',
	
	initialize : function(options) {

		// add options as properties
		_.defaults(this, options);

		this.listenTo(this.model, 'change', this.render);
	},

	close : function() {
		this.model.set('open', false);
	},

    open : function() {
        this.model.set('open', false);
    },

	render : function() {
		if (this.model.get('open')) {
			this.$el
                .addClass('open')
                .html(this.template({}));
            this.model.homeButton && this.$el.find('.homeButton').html(this.model.homeButton.render().el);
            this.model.content && this.$el.find('.content').html(this.model.content.render().el);
            this.model.inputZone1 && this.$el.find('.inputZone1').html(this.model.inputZone1.render().el);
            this.model.inputZone2 && this.$el.find('.inputZone2').html(this.model.inputZone2.render().el);
            this.model.inputZone3 && this.$el.find('.inputZone3').html(this.model.inputZone3.render().el);
            this.model.inputZone4 && this.$el.find('.inputZone4').html(this.model.inputZone4.render().el);
            this.model.inputZone5 && this.$el.find('.inputZone5').html(this.model.inputZone5.render().el);
            this.model.footer && this.$el.find('.footer').html(this.model.footer.render().el);
		} else {
			this.$el.removeClass('open');
		}

		return this;
	}

});