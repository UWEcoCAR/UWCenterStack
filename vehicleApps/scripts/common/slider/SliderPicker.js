CenterStack.SliderPicker = Marionette.CollectionView.extend({
    className: 'sliderPicker',

    events: {
        'touchstart': 'select',
        'mousedown': 'select'
    },

    initialize : function(options) {
        // add options as properties
        _.defaults(this, options);
    },

    select: function(evt) {
        console.log("evt", evt);
        evt.preventDefault();
        var x = evt.originalEvent.touches[0].pageX;
        var y = evt.originalEvent.touches[0].pageY;
        var offsetX = x - this.$el.offset().left;
        var offsetY = y - this.$el.offset().top;
        console.log("x, y", x, y);
        console.log("offsetX, offsetY", offsetX, offsetY);

        CenterStack.appRouter.navigate("slider/val=1", {
            trigger: false,
        });
        console.log(this);
        //this.$el.hide();
        this.close();
        this.$el.hide();

    },

    onRender: function() {
        console.log("onRender", this);
    }
});
