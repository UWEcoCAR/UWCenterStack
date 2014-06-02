var EveHomeMainZoneLeftView = Backbone.Marionette.ItemView.extend({
    template: '#eveHomeScreenLeftTemplate',

    onRender: function() {
    	this.$el.find('.leaf1').copyIn(leafIcon);
    	this.$el.find('.leaf2').copyIn(leafIcon);
    	this.$el.find('.leaf3').copyIn(leafIcon);
    	this.$el.find('.leaf4').copyIn(leafIcon);
    	this.$el.find('.leaf5').copyIn(leafIcon);

    	for (var i = 1; i <= this.model.get('score'); i++) {
    		this.$el.find('.leaf' + i).addClass('scored');
    	}

    	this.$el.find('#userImage').attr('src', CONFIG.MEDIA_PATH + "/" + this.model.get('userImage'));
    }
});