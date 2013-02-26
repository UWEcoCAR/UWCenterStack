function Button(ctx, name, image1, image2, diameter, position, text) {
	this.ctx = ctx;
	this.name = name;
	this.image1 = image1;
	this.image2 = image2;
	this.position = position;
	this.diameter = diameter;
		this.outerDiameter = (this.image1.width - 80)/this.image1.width * this.diameter;
	this.text = text;

	this.selected = false;
	this.needsUpdate = false;

	this.draw = function() {
		this.ctx.save();
		this.ctx.font = "20pt Arial";
		this.ctx.setFillColor('white');
		this.ctx.translate(this.position.x, this.position.y);
		this.ctx.fillText(text, -this.ctx.measureText(text).width/2, 9);
		if (this.selected){
			this.ctx.drawImage(this.image2, -this.diameter/2, -this.diameter/2, this.diameter, this.diameter); 
		} else {
			this.ctx.drawImage(this.image1, -this.diameter/2, -this.diameter/2, this.diameter, this.diameter); 
		}
		this.ctx.restore();
	}

	this.onStart = function(position) {
		this.selected = position.distanceFrom(this.position) < this.outerDiameter/2;
	}

	this.onMove = function(position) {
		this.selected = this.selected && position.distanceFrom(this.position) < this.outerDiameter/2;
	}

	this.onEnd = function(position) {
		if (this.selected){
			this.selected = false;
			return name;
		}
	}

	this.update = function() {
		
	}
}