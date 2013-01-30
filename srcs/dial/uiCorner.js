function Corner(name, image, NS, S, MS, position) {
	this.name = name;
	this.position = position;
	this.NS = NS*2;
	this.S = S*2;
	this.MS = MS*2;
	this.diameter = NS*2;
		this.outerDiameter = (500 - 250)/500 * this.diameter;

	this.selected = false;
	this.needsUpdate = false;
	this.startedInCorner = false;

	this.object = document.createElement('div');
		this.object.style.backgroundImage = "url(" + image + ")";
				this.object.style.backgroundSize = "contain";
			this.object.style.width = this.diameter + "px";
			this.object.style.height = this.diameter + "px";
			this.object.style.top = position.y - this.diameter/2 + "px";
			this.object.style.left = position.x - this.diameter/2 + "px";

	this.set = function() {
		this.object.style.width = this.diameter + "px";
			this.object.style.height = this.diameter + "px";
			this.object.style.top = position.y - this.diameter/2 + "px";
			this.object.style.left = position.x - this.diameter/2 + "px";
	}

	this.onStart = function(position) {
		this.startedInCorner = position.distanceFrom(this.position) < this.outerDiameter/2;
	}

	this.onMove = function(position) {
		if (this.startedInCorner){
			this.diameter = sizeEquation(Math.max(this.S/2+this.MS/2-position.distanceFrom(drag.startPos)*3, 0));
		} else {
			this.diameter = sizeEquation(position.distanceFrom(this.position));
		}
		this.outerDiameter = (500 - 250)/500 * this.diameter;
		this.needsUpdate = this.diameter != this.NS;

		if (this.startedInCorner && this.outerDiameter*2 == this.MS) {
			// this is wierd, I don't like this...
			onEnd(position);
		}
		this.set();
	}

	this.onEnd = function(position) {
		if (position.distanceFrom(this.position) < this.outerDiameter/2 || 
		   (this.startedInCorner && this.outerDiameter*2 == this.MS)) {
			return name;
		}

	}

	this.update = function() {
		this.needsUpdate = this.diameter != this.NS;
		if (this.needsUpdate){
			this.diameter = Math.max(this.diameter - 15, this.NS);
		}
		this.set();
	}

	function sizeEquation(distance){
		return Math.max(NS*2+S-distance, 0)/(NS*2+S)*(MS*2-NS*2) + NS*2;
	}
}