function SliderList(selector) {
	this.cssSelector = selector;
	this.listItems = $(this.cssSelector + ' li').length;
	this.position = 1;
	this.lastSliderPosition = 0;


    this.moveForward = function() {
    	this.position++;
    	if (this.position > this.listItems) {
    		this.position = 1;
    	}
    	var me = this;
        $(me.cssSelector + ' li:first').animate({'opacity':0}, 0, function () {
            $('#slider-list').append($(this));
            $(this).css({
                'opacity': 1,
                'font-size': '100%'
            });
            $(me.cssSelector + ' li:first').css('font-size', '150%');
        });
    }

    this.moveBackward = function() {
    	this.position--;
    	if (this.position < 1) {
    		this.position = this.listItems;
    	}
    	var me = this;
        $(me.cssSelector + ' li:first').animate({'font-size':'100%'}, 0, function() {
            $('#slider-list').prepend($(me.cssSelector + ' li:last'));
            $(me.cssSelector + ' li:first').css('font-size', '150%');
        });
    }

    this.goToPosition = function(newSliderPosition) {
    	var difference = Math.abs(newSliderPosition - this.lastSliderPosition);
    	var me = this;

    	while (difference > 0) {
    		if (newSliderPosition > me.lastSliderPosition) {
    			me.moveForward();
    		} else {
    			me.moveBackward();
    		}
    		difference -= .1;
    	}
    	this.lastSliderPosition = newSliderPosition;
    }
}