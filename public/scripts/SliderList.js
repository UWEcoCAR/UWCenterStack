function SliderList(options) {
	this.cssSelector = options.cssSelector;
	this.listItems = $(this.cssSelector + ' li').length;
	this.position = 1;
	this.lastSliderPosition = 0;
    this.sensitivity = options.sensitivity || .1;
    this.remove = options.continuous || false;
    this.removedValues = [];


    this.moveForward = function() {
        console.log("move forward");
        var me = this;
        if (me.remove) {
            this.position++;
            if (this.position > this.listItems) {
                this.position = 1;
            }
            
            $(me.cssSelector + ' li:first').animate({'opacity':0}, 0, function () {
                $(me.cssSelector).append($(this));
                $(this).css({
                    'opacity': 1,
                    'font-size': '100%'
                });
                $(me.cssSelector + ' li:first').css('font-size', '150%');
            });
        } else {
            me.position++;
            me.removedValues.push($(me.cssSelector + ' li:first').html());
            console.log(me.removedValues[0]);
            $(me.cssSelector + ' li:first').remove();
        }

    }

    this.moveBackward = function() {
        console.log("move backward");
        var me = this;
        if (me.remove) {
            me.position--;
            if (me.position < 1) {
                me.position = me.listItems;
            }
            var me = this;
            $(me.cssSelector + ' li:first').animate({'font-size':'100%'}, 0, function() {
                $(me.cssSelector).prepend($(me.cssSelector + ' li:last'));
                $(me.cssSelector + ' li:first').css('font-size', '150%');
            });
        } else if (me.removedValues.length > 0){
            me.position--;
            $(me.cssSelector).prepend('<li>' + me.removedValues.pop() + '</li>');
        }

    }

    this.goToPosition = function(newSliderPosition) {
    	var difference = Math.abs(newSliderPosition - this.lastSliderPosition);
        console.log("gotoposition", newSliderPosition, difference);
    	var me = this;
        if (difference > me.sensitivity) {

            while (difference > me.sensitivity) {
                if (newSliderPosition > me.lastSliderPosition) {
                    me.moveForward();
                    
                } else {
                    me.moveBackward();
                    
                }
                difference -= me.sensitivity;
            }
            this.lastSliderPosition = newSliderPosition - difference;
        }

    }
}