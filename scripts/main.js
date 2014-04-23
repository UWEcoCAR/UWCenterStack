/**
 * JavaScript Entry Point
 *
 * Initializes the Home, Eve, Music, and Climate Control apps. Also initializes global modules like the audio controller.
 *
 *
 *
 * node-webkit context: window
 */

$(document).keydown(function(e) {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 68) { // ctrl-d
        var win = require('nw.gui').Window.get();
        win.isDevToolsOpen() ? win.closeDevTools() : win.showDevTools();
    } else if ((e.ctrlKey || e.metaKey) && e.keyCode === 82) { // ctrl-r
        window.location.reload();
    }
});

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

    console.log('Application Starting');
});

centerStack.addRegions({
    main: '#appContainer'
});

centerStack.start();
