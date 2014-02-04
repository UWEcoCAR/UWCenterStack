var AppView = Backbone.View.extend({

    sectionNames : ['header', 'content', 'inputZone1', 'inputZone2', 'inputZone3', 'inputZone4', 'inputZone5', 'footer'],

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
                .empty();
            _.each(this.sectionNames, function(section) {
                if (this.model.get(section)) {
                    this.$el.append(
                        $('<div>')
                            .addClass(section)
                            .html(this.model.get(section).render().el));
                }
            }, this);
		} else {
			this.$el.removeClass('open');
		}

		return this;
	}

});