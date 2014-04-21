var iconLeft = "";
var iconRight = "";
var labelLeft = "";
var labelRight = "";
var SliderButtonViews = InputZoneView.extend({
  template: '#inputZoneTemplate',
   initialize: function(options) {
    iconLeft = options.iconLeft;
    iconRight = options.iconRight;
    labelLeft = options.labelRight;
    labelRight = options.labelRight;

    $(options.eventCatcher).click(_.bind(this.clicked, this));
    this.vent = options.vent;
  },

  clicked: function(data) {
    console.log("here");
    this.vent.trigger('buttonClick', data);
  },

  onRender: function() {
    (this.$el).find(".iconLeft").copyIn(iconLeft);
    (this.$el).find(".iconRight").copyIn(iconRight);
    (this.$el).find(".labelLeft").copyIn(labelLeft);
    (this.$el).find(".labelRight").copyIn(labelRight);
  }
});