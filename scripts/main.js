/**
 * JavaScript Entry Point
 *
 * Initializes the Home, Eve, Music, and Climate Control apps. Also initializes global modules like the audio controller.
 *
 *
 *
 * node-webkit context: window
 */

// Initialize keystrokes


var CenterStack = Backbone.Marionette.Application.extend({
    index: function() {
        var homeScreen = new HomeScreen();
        centerStack.main.show(homeScreen);
    },

    climateHome: function() {
        var climateHomeScreen = new ClimateHomeScreen();
        centerStack.main.show(climateHomeScreen);
    }

    // Route handlers go here
});
centerStack = new CenterStack();

// Initialize routing and history
centerStack.addInitializer(function() {
    new Backbone.Marionette.AppRouter({
        controller: centerStack,
        appRoutes: {
            '' : 'index',
            'climate' : 'climateHome'
            // Routes go here
        }
    });

    Backbone.history.start();

});

// Load SVG's
centerStack.addInitializer(function() {

});

var fs = require('fs');
var glob = require('glob');
_.each(['**/*.svg', 'icons/*.svg'], function(pattern) {
    _.each(glob.sync(pattern), function(filePath) {
        $('#svgContainer').append(fs.readFileSync(filePath, 'utf8'));
    });
});
$('#bezelOverlayWrapper').copyIn('#bezelOverlay');
$('#eventCatchersWrapper').copyIn('#eventCatchers');
$('.personIconRight').copyIn('#personIcon');
$('.personIconLeft').copyIn('#personIcon');

centerStack.addRegions({
    main: '#appContainer'
});

console.log('Application Starting');
centerStack.start();
