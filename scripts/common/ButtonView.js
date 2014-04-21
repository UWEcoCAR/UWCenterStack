var icon = "";
var ButtonView = Backbone.Marionette.ItemView.extend({
  template: '#buttonTemplate',

  initialize: function(options) {
    icon = options.icon;
    console.log(options.eventCatcher);
    $(options.eventCatcher).click(_.bind(this.clicked, this));
    this.vent = options.vent;
  },

  clicked: function(data) {
    this.vent.trigger('click', data);
  },

  onRender: function() {
    (this.$el).find(".icon").copyIn(icon);
  }
});
