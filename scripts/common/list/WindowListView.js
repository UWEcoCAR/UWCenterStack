centerStack.WindowListView = Marionette.CollectionView.extend({
    //

	initialize: function(options) {
		// add options as properties
		_.defaults(this, options);

        // defines the number of elements in the "window"
        this.lowerBound = 0;
        this.itemNumber = 0;
        this.windowSize = 25;

        // defines the speed of moving the window
        this.refreshSpeed = 50;

		// add listeners
		this.listenTo(this.data, 'add', this.addOne);
		this.listenTo(this.data, 'all', this.render);
		this.listenTo(this.slider, 'change:value', this.render);
        this.listenTo(this.slider, 'change:selection', this.selectCurrent);

		// customize dom
		this.$el
			.addClass('list')
			.append(
				$('<div>').addClass('listScroller')
			);
	},



    selectCurrent: function() {
        var listScroller = this.$el.find('.listScroller');
        var selected = listScroller.find('.selected');
        if (selected[0]) {
            console.log("selected", selected[0].innerText);
            //How do we want to update the app given this?
            //the ListModel should have a selected field,
            //  - and when that changes then another element can update
            //var sliderVal = this.slider.get('value');
            //var elementNumber = Math.round(sliderVal * (this.windowSize - 1)) + this.lowerBound;
            //console.log(this.slider);
            //this.$el.hide();
            //this.slider._events.reset[0].callback(this.slider._events.reset[0].context);
            //this.data.models[elementNumber].set({selected: true});
            //this.data = this.nextData;
            //console.log("this data", this.data.models);
            //console.log("next data", this.nextData.models);
            this.close();

            centerStack.appRouter.navigate("music/album/selected=" + selected[0].innerText, {
                trigger: true,
            });   
        }


        /*
        this.data.set(this.nextData.models);
        this.render();

        */
//        console.log(this.nextListView());
    }, 

	render: function() {
        var me = this;
        _.defer(_.bind(function() {
            var sliderVal = this.slider.get('value');
            var lowBound = 0.01;
            var upperBound = 0.99;

            var shiftLow = sliderVal < lowBound;
            var shiftHigh = sliderVal > upperBound;
            var shift = shiftLow || shiftHigh;
            
            if (me.timer) {
                clearInterval(me.timer);
            }


            var listScroller = this.$el.find('.listScroller');
            var list = this.$el;
            var listItems = listScroller.children();
            //console.log("list items", listItems);

            var elementNumber = Math.round(sliderVal * (me.windowSize - 1));

            itemHeight = Math.floor((listScroller.height() / listItems.size()));

            var newPos;
            var x = 1;
            var item;
            listScroller.find('.selected').removeClass('selected');
            listItems.eq(elementNumber).addClass('selected');

            // find the element within the current window
            elementNumber += me.lowerBound;
    
            if (!shift) {
                // active within the window
                listScroller.find('.selected').removeClass('selected');
                me.itemNumber = elementNumber;

                listItems.eq(elementNumber).addClass('selected');

                newPos = - elementNumber * itemHeight;
                console.log("newPosition", newPos);
                listScroller.css('top', newPos);
            } else if (shiftHigh) {
                // move the window towards the end
                console.log("list scroller", listScroller);
                me.timer = setInterval(function() {
                    listScroller.find('.selected').removeClass('selected');
                    console.log("shifting");
                    while (me.itemNumber > me.windowSize + me.lowerBound) {
                        me.lowerBound++;
                    }

                    newPos = (- elementNumber * itemHeight) + (-itemHeight * x++);
                    newPos = Math.max(newPos, -listScroller.height() + itemHeight);
                    listScroller.css('top', newPos);

                    me.itemNumber = -(newPos / itemHeight);

                    listItems.eq(Math.min(me.itemNumber, listItems.length - 1)).addClass('selected');
                    // end of the list
                    if (newPos == -listScroller.height() + itemHeight) {
                        clearInterval(me.timer);
                    }
                }, me.refreshSpeed);
            } else {
                // move the window towards the beginning
                me.timer = setInterval(function() {
                    listScroller.find('.selected').removeClass('selected');

                    newPos = (- elementNumber * itemHeight) + (itemHeight * x++);
                    newPos = Math.min(newPos, 0);
                    listScroller.css('top', newPos);

                    me.itemNumber = -(newPos / itemHeight);
                    // when scrolling to the beginning, the lower bound is the current item
                    me.lowerBound = me.itemNumber;

                    listItems.eq(me.itemNumber).addClass('selected');
                    if (newPos === 0) {
                        me.lowerBound = 0;
                        clearInterval(me.timer);
                    }
                }, me.refreshSpeed);
            }
            

        }, this));

        return this;
	},

	addOne: function(listItem) {
		// create new view and force it to render, then add it to dom
		var view = new centerStack.ListItemView({model: listItem}).render();
		this.$el.find('.listScroller').append(view.$el);
	}
}); 