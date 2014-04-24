var SliderButtonsView = InputZoneView.extend({
    template: '#inputZoneTemplate',
    
    initialize: function(options) {
      this.iconLeft = options.iconLeft || '';
      this.iconRight = options.iconRight || '';
      this.labelLeft = options.labelLeft || '';
      this.labelRight = options.labelRight || '';

      $(options.eventCatcher).click(_.bind(this.clicked, this));
      this.vent = options.vent;
    },

    clicked: function(data) {
        if (data.offsetX < 200) {
            this.vent.trigger('clickLeft', data);
        } else if (data.offsetX > 600) {
            this.vent.trigger('clickRight', data);
        }
    },

    onRender: function() {
        this.$el.find('.iconLeft').copyIn(this.iconLeft);
        this.$el.find('.iconRight').copyIn(this.iconRight);
        this.$el.find('.labelLeft').html(this.labelLeft);
        this.$el.find('.labelRight').html(this.labelRight);
    }
});