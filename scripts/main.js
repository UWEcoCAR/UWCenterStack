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
_.each(['bezelOverlay', 'eventCatchers', 'icons'], function(file) {
    $('#svgContainer').append(fs.readFileSync('svg/' + file + '.svg', 'utf8'));
});
$('#bezelOverlayWrapper').copyIn('#bezelOverlay');
$('#eventCatchersWrapper').copyIn('#eventCatchers');

centerStack.addRegions({
    main: '#appContainer'
});

console.log('Application Starting');
centerStack.start();
