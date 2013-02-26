function Corner(ctx, name, image, NS, S, MS, position) {
	this.name = name;
	this.ctx = ctx;
	this.image = image;
	this.position = position;
	this.NS = NS*2;
	this.S = S*2;
	this.MS = MS*2;
	this.diameter = NS*2;
			this.outerDiameter = (this.image.width - 250)/this.image.width * this.diameter;

	this.selected = false;
	this.needsUpdate = false;
	this.startedInCorner = false;

	this.draw = function() {
		this.ctx.save();
		this.ctx.translate(this.position.x, this.position.y)
		this.ctx.drawImage(this.image, -this.diameter/2, -this.diameter/2, this.diameter, this.diameter)
		this.ctx.restore();
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
		this.outerDiameter = (this.image.width - 250)/this.image.width * this.diameter;
		this.needsUpdate = this.diameter != this.NS;

		if (this.startedInCorner && this.outerDiameter*2 == this.MS) {
			// this is wierd, I don't like this...
			onEnd(position);
		}
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
	}

	function sizeEquation(distance){
		return Math.max(NS*2+S-distance, 0)/(NS*2+S)*(MS*2-NS*2) + NS*2;
	}
}