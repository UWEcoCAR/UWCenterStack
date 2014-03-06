/*
	options that must be passed:
		model
		top
		left
		width
		height
		diameter
		equation
 */
var SliderView = Marionette.CollectionView.extend({

    className: 'slider',

    events: {
        'touchstart .handle': 'touchStart',
        'touchmove': 'updateVal',
        'touchend': 'touchEnd',
        'mousedown .handle': 'slideStart',
        'mousemove': 'updateVal',
        'mouseup': 'slideEnd'
    },

    initialize : function(options) {
        // add options as properties
        _.defaults(this, options);
        this.hidden = false;
        // add listeners    
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'reset', this.reset);

        // add slider handle
        this.$el.append($('<div>').addClass('handle'));
    },

/*
    reset: function(me) {

        console.log("reset fired", me.$el);

        me.$el.hide();
        me.hidden = true;
    },
    */

    _getEventPosition: function(evt) {
        evt = evt.originalEvent;
        if (evt.touches) {
            return evt.touches[0].clientX;
        } else {
            return evt.clientX;
        }
    },

    updateVal: function(evt) {
        //console.log(evt);
        evt.preventDefault();
        var evtPosition = this._getEventPosition(evt);

        if (this.sliding) {
            var offsetX = evtPosition - this.$el.offset().left;
            var precentX = offsetX / this.$el.width();

            // normalize x
            precentX = Math.max( Math.min(precentX , 1), 0);

            this.model.set({value : precentX});
        }

    },

    slideStart: function(evt) {
        //console.log(evt);
        evt.preventDefault();
        this.sliding = true;
    },

    slideEnd: function(evt) {
        //console.log(evt);
        evt.preventDefault();
        this.sliding = false;
        this.selection(evt);
    },

    selection: function(evt) {
        var val = this.model.get('selection');
        console.log('touch ended ', val);
        // fire selection for the list to see
        this.model.set({selection : (val + 1)});
    },

    render: function() {
        console.log("rendering");
        if (!this.hidden) {
            console.log("render");
            if(this.$el.width() === 0) {
                _.defer(_.bind(this.render, this));
            } else {
                var value = this.model.get('value');
                var width = this.$el.width();
                var height = this.$el.height();
                var diameter = this.$el.find('.handle').width();
                console.log("val", value);
                console.log(this.equation(value));
                value = Math.min(0.999, value);
                this.$el
                    .show()
                    .find('.handle')
                    .css('transform', 'translate3d(' + (value * width - diameter / 2) + 'px, ' + -(this.equation(value) * (height - diameter)) + 'px, 0)');
            }  
        }


        return this;
    }
});