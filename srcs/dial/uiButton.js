function Button(name, image1, image2, diameter, position, text) {
	this.name = name;
	this.image1 = image1;
	this.image2 = image2;
	this.position = position;
	this.diameter = diameter;
		this.outerDiameter = (512 - 80)/512 * this.diameter;
	this.text = text;

	this.selected = false;
	this.needsUpdate = false;

	this.object = document.createElement('div');
		this.object.style.backgroundImage = "url(" + this.image1 + ")";
			this.object.style.backgroundSize = "contain";
		this.object.style.width = diameter + "px";
		this.object.style.height = diameter + "px";
		this.object.style.top = position.y - diameter/2 + "px";
		this.object.style.left = position.x - diameter/2 + "px";

	this.set = function() {
		if (this.selected) {
			this.object.style.backgroundImage = "url(" + this.image2 + ")";
		} else {
			this.object.style.backgroundImage = "url(" + this.image1 + ")";
		}
	}

	this.onStart = function(position) {
		this.selected = position.distanceFrom(this.position) < this.outerDiameter/2;
		this.set();
	}

	this.onMove = function(position) {
		this.selected = this.selected && position.distanceFrom(this.position) < this.outerDiameter/2;
		this.set();
	}

	this.onEnd = function(position) {
		if (this.selected){
			this.selected = false;
			this.set();
			return name;
		}
	}

	this.update = function() {
		
	}
}