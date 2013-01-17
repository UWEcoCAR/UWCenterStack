function UIElementList(canvas) {
	this.list = new Array();
	this.ctx = canvas.getContext('2d');

	/**
	 * Adds a UI Element to the list
	 * @param element any element from UIElements.js
	 */
	this.add = function(element){
		this.list.push(element);
	}

	/**
	 * Clears canvas and calls the draw function on each element in the list
	 */
	this.draw = function() {
		this.ctx.clearRect(0,0,width,height);
		$.each(this.list, function(index, element) {
			element.draw();
		});
	}

	/**
	 * Calls the onStart method on each element in the list
	 * then redraws all elements
	 */
	this.onStart = function(position) {
		$.each(this.list, function(index, element) {
			element.onStart(position);
		});
		this.draw();
	}

	/**
	 * Calls the onMove method on each element in the list
	 * then redraws all elements
	 */
	this.onMove = function(position) {
		$.each(this.list, function(index, element) {
			element.onMove(position);
		});
		this.draw();
	}

	/**
	 * Calls the onEnd method on each element in the list
	 * then redraws all elements
	 * @return {false | x}
	 */
	this.onEnd = function(position) {
		var returner = false;
		$.each(this.list, function(index, element) {
			var temp = element.onEnd(position);
			if (temp && !returner /* take away second test to have corners override elements*/) {
				returner = temp;
			}
		});
		this.draw();
		return returner;
	}

	/**
	 * Calls the onUpdate method on each element in the list
	 * then redraws all elements
	 */
	this.update = function() {
		$.each(this.list, function(index, element) {
			element.update();
		});
		this.draw();
	}

	/**
	 * @return true if any element in the list has the flag needsUpdate set to true
	 */
	this.needsUpdate = function() {
		var needsUpdate = false;
		for (var i = 0; i < this.list.length; i++){
			needsUpdate = needsUpdate || this.list[i].needsUpdate;
		}
		return needsUpdate;
	}

}