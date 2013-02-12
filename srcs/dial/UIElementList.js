function UIElementList(parent) {
	this.list = new Array();
	this.parent = parent;
	this.zIndex = 0;
	/**
	 * Adds a UI Element to the list
	 * @param element any element from UIElements.js
	 */
	this.add = function(element){
		this.list.push(element);
		this.zIndex = element.onAdd(this.parent, this.zIndex);
	}

	/**
	 * Calls the onStart method on each element in the list
	 * then redraws all elements
	 */
	this.onStart = function(position) {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].onStart(position);
		}
	}

	/**
	 * Calls the onMove method on each element in the list
	 * then redraws all elements
	 */
	this.onMove = function(position) {

		for (var i = 0; i < this.list.length; i++) {
			this.list[i].onMove(position);
		}
	}

	/**
	 * Calls the onEnd method on each element in the list
	 * then redraws all elements
	 * @return {false | x}
	 */
	this.onEnd = function() {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].onEnd();
		}
	}

	/**
	 * Calls the onUpdate method on each element in the list
	 * then redraws all elements
	 */
	this.update = function() {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].update();
		}
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