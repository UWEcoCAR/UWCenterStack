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

// Layout definition
MainLayout = Backbone.Marionette.Layout.extend({
  template: "#layout-template",
  regions: {
    overallContent: '.overallContent'
  },

  onRender: function() {
   // will be triggered on render;
   console.log('onRender');
  }

});

// creating layout and starting application
var layout = new MainLayout();

$('#appContainer').append(layout.render().el);
Backbone.history.start();


/*
console.log(CenterStack);
CenterStack.appRouter = new CenterStack.RouteMapping();
Backbone.history.start();
*/
