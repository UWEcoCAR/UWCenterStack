/**
 * View for sliders
 */
var iconLeft = "";
var iconRight = "";
var leftLabel = "";
var rightLabel = "";
var SliderView = InputZoneView.extend({
  template: '#inputZoneTemplate',
   initialize: function(options) {
    iconLeft = options.iconLeft;
    iconRight = options.iconRight;
    leftLabel = options.leftLabel;
    rightLabel = options.rightLabel;

    // touch events to be fired
    this.vent = options.vent;
    $(options.eventCatcher).on('touchstart', _.bind(this.touch, this));

    $(options.eventCatcher).on('touchmove', _.bind(this.change, this));
   
    $(options.eventCatcher).on('touchend', _.bind(this.release, this));
  
  },

  touch: function(data) {
    this.vent.trigger('slider:touch', data);
  },

  change: function(data) {
    this.vent.trigger('slider:change', data);
  },

  release: function(data) {
    this.vent.trigger('slider:touchEnd', data);
  },

  onRender: function() {
    (this.$el).find(".iconLeft").copyIn(iconLeft);
    (this.$el).find(".iconRight").copyIn(iconRight);
    (this.$el).find(".leftLabel").html(leftLabel);
    (this.$el).find(".rightLabel").html(rightLabel);
  }
});


