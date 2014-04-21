/**
 * JavaScript Entry Point
 *
 * Initializes the Home, Eve, Music, and Climate Control apps. Also initializes global modules like the audio controller.
 *
 *
 *
 * node-webkit context: window
 */

console.log("hello");
CenterStack = new Backbone.Marionette.Application.extend({
	appRouter: new RouteMapping()
});

// creating layout and starting application
var homeScreen = new HomeScreen();
$('#appContainer').append(homeScreen.render().el);

Backbone.history.start();

/*
console.log(CenterStack);
CenterStack.appRouter = new CenterStack.RouteMapping();
Backbone.history.start();
*/
