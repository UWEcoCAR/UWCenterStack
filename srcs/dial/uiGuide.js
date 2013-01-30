function Guide(name, image, diameter) {
	this.name = name;
	this.image = image;
	this.diameter = diameter;

	this.selected = false;
	this.needsUpdate = false;
	this.position;

	this.object = document.createElement('div');
		this.object.style.backgroundImage = "url(" + image + ")";
			this.object.style.backgroundSize = "contain";
		this.object.style.width = diameter + "px";
		this.object.style.height = diameter + "px";
		this.object.style.top = "0px";
		this.object.style.left = "0px";
		this.object.style.display = "none";
		this.object.style.opacity = ".3";

	this.set = function() {
		if (this.selected) {
			this.object.style.display = ""
		} else {
			this.object.style.display = "none";
		}
		this.object.style.top = this.position.y - this.diameter/2 + "px";
		this.object.style.left = this.position.x - this.diameter/2 + "px";
	}

	this.onStart = function(position) {
		this.position = position;
		this.selected = true;
		this.set();
	}

	this.onMove = function(position) {
		this.position = position;
		this.set();
	}

	this.onEnd = function(position) {
		this.selected = false;
		this.set();
	}

	this.update = function() {
		
	}
}

