function Basic(ctx, name, image, position, diameter) {
	this.ctx = ctx;
	this.name = name;
	this.image = image;
	this.position = position;
	this.diameter = diameter;
	//	this.outerDiameter = (this.image.width - XXX)/this.image.width * this.diameter;

	this.selected = false;
	this.needsUpdate = false;

	// draws image on canvas
	this.draw = function() {
		this.ctx.save();
		this.ctx.translate(this.position.x, this.position.y)
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
		return false;
	}

 	// called once when pointer event ends
 	// returns false||xx
	this.onEnd = function(position) {

		// returns false if no new information from it is present
		// otherwise it should return a string including its name
		// and any other information necessary
		return false;
	}

	// resets element one step back to default, only called(/called forever) if this.needsUpdate == true
	this.update = function() {

	}
}