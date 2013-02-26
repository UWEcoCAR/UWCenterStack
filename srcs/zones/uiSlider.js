function Slider(ctx, name, image, position, diameter, startAngle, endAngle, isRightSide) {
	this.ctx = ctx;
	this.name = name;
	this.image = image;
	this.position = position;
	this.sliderPosition = new Position(0,0);
	this.diameter = diameter;
	this.sliderDiameter = 100;
		this.outerDiameter = (this.image.width - 80)/this.image.width * this.sliderDiameter;
	this.startAngle = startAngle;
	this.endAngle = endAngle;
		this.max = Math.sin(this.startAngle) * this.diameter;
		this.min = Math.sin(this.endAngle) * this.diameter;
	this.selected = false;
	this.needsUpdate = false;
	this.isRightSide = isRightSide;
	this.drag;
	this.lastClick;

	// draws image on canvas
	this.draw = function() {
		this.ctx.save();
		this.ctx.translate(this.position.x, this.position.y)

		this.ctx.beginPath();
			this.ctx.arc(0,0, this.diameter, this.startAngle, this.endAngle, this.isRightSide);
			this.ctx.lineWidth = 25;
			this.ctx.lineCap = 'round';
			this.ctx.strokeStyle = 'grey';
		this.ctx.stroke();

		this.ctx.beginPath();
			this.ctx.arc(0,0, this.diameter, this.startAngle, (this.isRightSide ? 0 : Math.PI) + Math.atan(this.sliderPosition.y/this.sliderPosition.x), this.isRightSide);
			this.ctx.lineWidth = 30;
			this.ctx.lineCap = 'round';
			this.ctx.strokeStyle = 'white';
		this.ctx.stroke();

		this.ctx.drawImage(this.image, this.sliderPosition.x - this.sliderDiameter/2, this.sliderPosition.y - this.sliderDiameter/2, this.sliderDiameter, this.sliderDiameter);
		this.ctx.restore();
	}

	// called once when pointer event starts
	this.onStart = function(position) {
		this.selected = position.distanceFrom(new Position(this.sliderPosition.x + this.position.x, this.sliderPosition.y + this.position.y)) < this.outerDiameter/2;
		if (this.selected) {
			lastClick = position.y
		}
	}

	// called every time pointer changes locations
	this.onMove = function(position) {
		if (this.selected) {
			var deltaY = position.y - lastClick;
			this.setLoc(this.sliderPosition.y + deltaY);
			lastClick = position.y;
			return 1 - (this.sliderPosition.y + this.max) / (this.max - this.min);
		}
	}

 	// called once when pointer event ends
 	// returns false||xx
	this.onEnd = function(position) {
		if (this.selected) {
			return name;
		}
	}

	// resets element one step back to default, only called(/called forever) if this.needsUpdate == true
	this.update = function() {

	}

	this.setLoc = function(value) {
		this.sliderPosition.y = Math.min(Math.max(value, this.min), this.max);
		this.sliderPosition.x = Math.cos(Math.asin(this.sliderPosition.y/this.diameter)) * this.diameter;
		if (!this.isRightSide) {
			this.sliderPosition.x = -this.sliderPosition.x;
		}
	}
	this.setLoc(0);
}