function Zone(ctx, name, position, diameter) {
	this.ctx = ctx;
	this.name = name;
	this.position = position;
	this.diameter = diameter;

	this.selected = false;
	this.hover = false;
	this.target;

	// draws image on canvas
	this.draw = function() {
		this.ctx.save();
		this.ctx.translate(this.position.x, this.position.y)
		this.ctx.beginPath();
			this.ctx.arc(0,0, this.diameter, 0, Math.PI * 2);
			this.ctx.lineWidth = this.hover?10:this.selected?5:3;
			this.ctx.strokeStyle = this.selected?'white':'grey';
		this.ctx.stroke();
		this.ctx.restore();
	}

	// called once when pointer event starts
	this.onStart = function(position) {
		
	}

	// called every time pointer changes locations
	this.onMove = function(position) {

		// returns false if no new information from it is present
		// otherwise it should return a string including its name 
		// and any other information necessary
	}

 	// called once when pointer event ends
 	// returns false||xx
	this.onEnd = function(position) {

		// returns false if no new information from it is present
		// otherwise it should return a string including its name
		// and any other information necessary
	}

	// resets element one step back to default, only called(/called forever) if this.needsUpdate == true
	this.update = function() {

	}

	this.isThere = function(position) {
		this.hover = position.distanceFrom(this.position) <= this.diameter;
		return position.distanceFrom(this.position) <= this.diameter;
	}
}