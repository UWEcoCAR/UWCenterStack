var EveMapMainZoneView = Backbone.Marionette.ItemView.extend({
    template: '#eveMapScreenTemplate',

    onRender: function() {
		var mapManager = new MapManager({
		    LAT: 42.5943813,
		    LNG: -83.6828616,
		    HEIGHT: 722,
			WIDTH: 800
		});
		console.log(mapManager.getMap());
    	this.$el.find("#mapAndCanvasContainer").append(mapManager.getMap());

        setTimeout(_.bind(function() {
            mapManager.displayEfficiency(function() {
                console.log('all done!!!!');
            });
        }, this), 2000);

    	$("#mapAndCanvasContainer").on('click', function() {
    		console.log("hello");
    	});
    }
});