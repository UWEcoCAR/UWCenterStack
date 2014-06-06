var EveMapMainZoneView = Backbone.Marionette.ItemView.extend({
    template: '#eveMapScreenTemplate',

    onRender: function() {
		var mapManager = new MapManager({
		    LAT: 47.654109,
		    LNG: -122.304331,
		    HEIGHT: 280,
			WIDTH: 700
		});
		console.log(mapManager.getMap());
    	this.$el.find("#mapAndCanvasContainer").append(mapManager.getMap());
    	$("#mapAndCanvasContainer").on('click', function() {
    		console.log("hello");
    	});
    }
});