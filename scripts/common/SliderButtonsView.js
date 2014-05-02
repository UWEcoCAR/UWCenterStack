var SliderButtonsView = InputZoneView.extend({
    template: '#inputZoneTemplate',
    
    initialize: function(options) {
      this.eventId = options.eventId;
      this.buttonLeft = options.buttonLeft || "";
      this.buttonRight = options.buttonRight || "";
      this.iconLeft = options.iconLeft || '';
      this.iconRight = options.iconRight || '';
      this.labelLeft = options.labelLeft || '';
      this.labelRight = options.labelRight || '';
      this.eventCatcher = options.eventCatcher || '';
      this.sameEvents = false;
      this.vent = options.vent;
     $(this.eventCatcher).on('click.' + this.cid, _.bind(this.clicked, this));
    },

    clicked: function(data) {
        if (data.offsetX < 200) {
            this.vent.trigger(this.eventId + ':clickLeft', data, this.buttonLeft);
        } else if (data.offsetX > 600) {
            this.vent.trigger(this.eventId + ':clickRight', data, this.buttonRight);
        }
    },

    onRender: function() {
        (this.$el).find('.iconLeft').copyIn(this.iconLeft);
        (this.$el).find('.iconRight').copyIn(this.iconRight);
        (this.$el).find('.labelLeft').html(this.labelLeft);
        (this.$el).find('.labelRight').html(this.labelRight);
    },

    onClose: function() {
        // stop listening for events, if this is a different view
        if(!this.sameEvents) {
            $(this.eventCatcher).off("." + this.cid);
        } else {
            this.sameEvents = false;
        }
    }
});