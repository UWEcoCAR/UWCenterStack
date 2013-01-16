function Dial(dCanvas, diameter) {
	this.selected = false;
	this.canvas = dCanvas;
	this.ctx = dCanvas.getContext('2d');
	this.diameter = diameter;
	this.theta = 0;

	this.dialImage = new Image();
	this.dialImage.src = 'dial.png';

	this.outerDiameter = (this.dialImage.width - 80)/this.dialImage.width * this.diameter;
	this.innerDiameter = (this.dialImage.width - 186)/this.dialImage.width * this.diameter;

	this.ctx.setFillColor('white');
	this.ctx.font = "120pt Arial";

	this.lastAngle;

	this.draw = function() {
		this.ctx.save();
		this.ctx.clearRect(0,0,width,height);
		this.ctx.translate(width/2, height/2);
		this.ctx.fillText(Math.round(this.theta/2/Math.PI*360), -this.ctx.measureText(Math.round(this.theta/2/Math.PI*360)).width/2 ,60);
		this.ctx.rotate(this.theta);
		this.ctx.drawImage(this.dialImage, -this.diameter/2, -this.diameter/2, this.diameter, this.diameter);
		this.ctx.restore();
	}

	this.click = function(position) {
		if (this.selected){
			var currentAngle;
			if (position.y < height/2){
				currentAngle = Math.PI/2-Math.atan((position.x - width/2)/ (position.y - height/2));
			} else {
				currentAngle = Math.PI/2*3-Math.atan((position.x - width/2)/ (position.y - height/2));
			}

			this.theta+=currentAngle - this.lastAngle;
			if (this.theta < 0){
				this.theta += Math.PI*2;
			} else if (this.theta > Math.PI*2){
				this.theta -= Math.PI*2;
			}
			this.lastAngle = currentAngle;
			this.draw();
		} else {
			if (position.distanceFrom(new Position(width/2, height/2)) < this.outerDiameter/2 &&
				position.distanceFrom(new Position(width/2, height/2)) > this.innerDiameter/2){
				this.selected = true;
				if (position.y < height/2){
					this.lastAngle = Math.PI/2-Math.atan((position.x - width/2)/ (position.y - height/2));
				} else {
					this.lastAngle = Math.PI/2*3-Math.atan((position.x - width/2)/ (position.y - height/2));
				}
			}
		}
	}

	this.unclick = function() {
		this.selected = false;
	}
}