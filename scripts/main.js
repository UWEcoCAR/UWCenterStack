/**
 * JavaScript Entry Point
 *
 * Initializes the Home, Eve, Music, and Climate Control apps. Also initializes global modules like the audio controller.
 *
 *
 *
 * node-webkit context: window
 */

var CenterStack = Backbone.Marionette.Application.extend({
    index: function() {
        var homeScreen = new HomeScreen();
        centerStack.main.show(homeScreen);
    }

    // Route handlers go here
});
centerStack = new CenterStack();

centerStack.addInitializer(function() {
    new Backbone.Marionette.AppRouter({
        controller: centerStack,
        appRoutes: {
            '' : 'index'
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