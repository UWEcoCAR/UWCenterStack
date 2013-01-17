function UIElementList(canvas) {
	this.list = new Array();
	this.ctx = canvas.getContext('2d');

	this.add = function(element){
		this.list.push(element);
	}

	this.draw = function() {
		this.ctx.clearRect(0,0,width,height);
		$.each(this.list, function(index, element) {
			element.draw();
		});
	}

	this.onStart = function(position) {
		$.each(this.list, function(index, element) {
			element.onStart(position);
		});
		this.draw();
	}

	this.onMove = function(position) {
		$.each(this.list, function(index, element) {
			element.onMove(position);
		});
		this.draw();
	}

	this.onEnd = function() {
		$.each(this.list, function(index, element) {
			element.onEnd();
		});
		this.draw();
	}


}