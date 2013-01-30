function UIElementList(parent) {
	this.list = new Array();
	this.parent = parent;
	/**
	 * Adds a UI Element to the list
	 * @param element any element from UIElements.js
	 */
	this.add = function(element){
		this.list.push(element);
		this.parent.appendChild(element.object);
	}

	/**
	 * Calls the onStart method on each element in the list
	 * then redraws all elements
	 */
	this.onStart = function(position) {
		$.each(this.list, function(index, element) {
			element.onStart(position);
		});
	}

	/**
	 * Calls the onMove method on each element in the list
	 * then redraws all elements
	 */
	this.onMove = function(position) {
		var returner = new Array();
		$.each(this.list, function(index, element) {
			returner.push(element.onMove(position));
		});
		return returner;
	}

	/**
	 * Calls the onEnd method on each element in the list
	 * then redraws all elements
	 * @return {false | x}
	 */
	this.onEnd = function(position) {
		var returner = new Array();
		$.each(this.list, function(index, element) {
			returner.push(element.onEnd(position));
		});
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

	this.clear = function() {
		$.each(this.ctxList, function(index, ctx) {
			ctx.clearRect(0,0,width,height);
		});
	}
}