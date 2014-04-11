/**
 * JavaScript Entry Point
 *
 * Initializes the Home, Eve, Music, and Climate Control apps. Also initializes global modules like the audio controller.
 *
 *
 *
 * node-webkit context: window
 */


console.log(CenterStack);
CenterStack.appRouter = new CenterStack.RouteMapping();
Backbone.history.start();
CenterStack.appRouter.navigate("music/artist", {trigger: true});
