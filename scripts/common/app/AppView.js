centerStack.AppView = Backbone.Marionette.Layout.extend({


    
    // sectionNames : ['header', 'contentLeft', 'sliderPicker', 'footer'],
    tagName: 'div',
    id: 'home',
    className: 'app',
    template: "#appTemplate",

    events: {
        //'touchstart .sliderPicker': 'select',
        'mousedown .sliderPicker': 'select'
    },
	
	initialize : function(options) {

		// add options as properties
		_.defaults(this, options);
        this.selected = false;

		this.listenTo(this.model, 'change', this.render);
	},

    select: function(evt) {
        console.log(evt);
        evt.preventDefault();
        console.log(this.selected);
        if (!this.selected) {
            var x = evt.pageX;
            var y = evt.pageY;
            var offsetX = x - this.$el.offset().left;
            var offsetY = y - this.$el.offset().top;
            //console.log("x, y", x, y);
            console.log("offsetX, offsetY", offsetX, offsetY);
            var sliderNum;
            if (offsetX > 140 && offsetX < 230) {
                sliderNum = Math.floor(1 + (offsetY - 250) / 30);
            } else {
                sliderNum = Math.floor(1 + (offsetY - 300) / 30);
            }

            
            console.log("slider num: ", sliderNum);
            this.$el.find('#listView' + sliderNum).show();
            $('.inputZone' + sliderNum).removeClass('hidden');
            this.selected = true;
            console.log($('.inputZone' + sliderNum + ' .slider .handle'));
            $('.inputZone' + sliderNum + ' .slider .handle').trigger('mousedown');
            
        } else {
            this.selected = false;
        }

          
        //console.log(this.model.attributes.lists[sliderNum - 1]);
        //this.model.attributes.lists[sliderNum - 1].fireEvent("updateVal",evt);
    },

    onRender: function() {
        var position;
        var slider;
        var list;
        for (var i = 0; i < this.model.attributes.lists.length; i++) {
            position = i + 1;
            slider = this.$el.find('.inputZone' + position);
            list = this.$el.find('#listView' + position);
            console.log(slider);
            console.log(list);
            
            // add the lists and sliders to the page
            this.$el.find(slider).html((this.model.attributes.lists[i].slider.el));
            this.$el.find(list).html((this.model.attributes.lists[i].listView.el));
            this.$el.find(list.hide());
        }

        // show the first list
        //this.$el.find('#listView1').show();

    }

});