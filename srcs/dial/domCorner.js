function Corner(name, image, position) {
	this.name = name;
	this.position = position;
	this.NS = 400;
	this.S = 100;
	this.MS = 600;
	this.diameter = 400;
		this.outerDiameter = (500 - 250)/500 * this.diameter;

	this.selected = false;
	this.needsUpdate = true;
	this.startedInCorner = false;

	this.object = document.createElement('div');
		this.object.style.width = this.diameter + "px";
		this.object.style.height = this.diameter + "px";
		this.object.style.backgroundImage = "url(" + image + ")";
			this.object.style.backgroundSize = "contain";
		this.object.style.webkitTransform = "translate(" + (this.position.x - this.diameter/2) + "px, " + (this.position.y - this.diameter/2) + "px)";

	this.set = function() {
		if (this.diameter != this.NS) {
			this.object.style.width = this.diameter + "px";
			this.object.style.height = this.diameter + "px";
			this.object.style.webkitTransform = "translate(" + (this.position.x - this.diameter/2) + "px, " + (this.position.y - this.diameter/2) + "px)";
		}
	}

	this.onStart = function(position) {
		this.startedInCorner = position.distanceFrom(this.position) < this.outerDiameter/2;
	}

	this.onMove = function(position) {
		if (this.startedInCorner){
			this.diameter = this.sizeEquation(Math.max(this.S/2+this.MS/2-position.distanceFrom(drag.startPos)*2, 0));
		} else {
			this.diameter = this.sizeEquation(position.distanceFrom(this.position));
		}
		this.outerDiameter = (500 - 250)/500 * this.diameter;
		this.needsUpdate = this.diameter != this.NS;

		if (this.startedInCorner && this.outerDiameter*2 == this.MS) {
			// this is wierd, I don't like this...
			onEnd(position);
		}
		this.set();
	}

	this.onEnd = function() {
		if (drag.currentPos.distanceFrom(this.position) < this.outerDiameter/2 || 
		   (this.startedInCorner && this.outerDiameter*2 == this.MS)) {
			return name;
		}
	}

	this.update = function() {
		this.needsUpdate = this.diameter != this.NS;
		if (this.needsUpdate){
			this.diameter = Math.max(this.diameter - 30, this.NS);
		}
		this.set();
	}

	this.onAdd = function(parent, zIndex) {
		this.object.style.zIndex = zIndex++;
		parent.appendChild(this.object);
		return zIndex;
	}

	this.sizeEquation = function(distance){
		return Math.max(this.NS+this.S-distance, 0)/(this.NS+this.S)*(this.MS-this.NS) + this.NS;
	}
}