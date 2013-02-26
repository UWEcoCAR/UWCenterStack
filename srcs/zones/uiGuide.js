function Guide(ctx, name, image, diameter) {
	this.ctx = ctx;
	this.name = name;
	this.image = image;
	this.diameter = diameter;

	this.selected = false;
	this.needsUpdate = false;
	this.position;

	this.draw = function() {
		if (this.selected){
			this.ctx.save();
			this.ctx.translate(this.position.x, this.position.y);
			this.ctx.globalAlpha = .3;
			this.ctx.drawImage(this.image, -this.diameter/2, -this.diameter/2, this.diameter, this.diameter);
			this.ctx.restore();
		}
	}

	this.onStart = function(position) {
		this.position = position;
		this.selected = true;
	}

	this.onMove = function(position) {
		this.position = position;
	}

	this.onEnd = function(position) {
		this.selected = false;
	}

	this.update = function() {
		
	}
}

