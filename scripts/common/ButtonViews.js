var icon = "";
var ButtonView = Backbone.Marionette.ItemView.extend({
  template: '#buttonTemplate',

  initialize: function(options) {
    icon = options.icon;
  },

  onRender: function() {
    (this.$el).find(".icon").copyIn(icon);
  }
});
