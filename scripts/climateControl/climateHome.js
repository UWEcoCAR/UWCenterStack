/**
 * Model and View for climate control home screen
 */
var model = new Backbone.Model({
  "contentTest": "<p>climate</p>",
});

var ClimateControl = Backbone.Marionette.ItemView.extend({
  template: '#content-template',
  model: model
});


