function Basic(canvas, name) {
	this.canvas = canvas;
	this.name = name;
	this.ctx = this.canvas.getContext('2d');

	this.image = new Image();
		this.image.src = '';

	this.selected = false;
	this.needsUpdate = false;
	this.position;

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

	}

 	// called once when pointer event ends
 	// returns false||xx
	this.onEnd = function(position) {

		// return name;
		return false;
	}

	// resets element one step back to default, only called(/called forever) if this.needsUpdate == true
	this.update = function() {

	}
}

function Corner(canvas,name,NS, S, MS, position) {
	this.canvas = canvas;
	this.name = name;
	this.ctx = this.canvas.getContext('2d');

	this.image = new Image();
		this.image.src = 'circle.png';

	this.selected = false;
	this.needsUpdate = false;
	this.drag;
	this.position = position;
		this.NS = NS*2;
		this.diameter = NS*2;
			this.outerDiameter = (this.image.width - 250)/this.image.width * this.diameter;
		this.S = S*2;
		this.MS = MS*2;

	this.draw = function() {
		this.ctx.save();
		this.ctx.translate(this.position.x, this.position.y)
		this.ctx.drawImage(this.image, -this.diameter/2, -this.diameter/2, this.diameter, this.diameter)
		this.ctx.restore();
	}

	this.onStart = function(position) {
		drag = new Drag(position);
	}

	this.onMove = function(position) {
		drag.inProgress = true;
		drag.addPosition(position);
		this.diameter = sizeEquation(position.distanceFrom(this.position));
			this.outerDiameter = (this.image.width - 250)/this.image.width * this.diameter;
		this.needsUpdate = this.diameter != this.NS;

	}

	this.onEnd = function(position) {
		drag.end();
		if (position.distanceFrom(this.position) < this.outerDiameter/2) {
			return name;
		} else {
			return false;
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

/**
 * Creates a new Dial
 * @class represents a rotatable dial, and handles control of it
 * @param dCanvas, the canvas object the dial should go on
 * @param diameter, width and height of the dial image
 * @returns a Dial object
 */

function Dial(canvas, name, diameter, position) {

	// sets up canvas
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
	this.name = name;

	// load dial image
	this.dialImage = new Image();
		this.dialImage.src = 'dial.png';

	// calculates limits for selecting the dial based off of image diameter
	this.diameter = diameter;
		this.outerDiameter = (this.dialImage.width - 80)/this.dialImage.width * this.diameter;
		this.innerDiameter = (this.dialImage.width - 186)/this.dialImage.width * this.diameter;

	this.position = position;
	this.selected = false;
	this.needsUpdate = false;
	this.lastAngle;
	this.theta = 0;

	/**
	 * Draws the dial
	 */
	this.draw = function() {
		this.ctx.save(); // saves rotatation and location at default
		this.ctx.setFillColor('white');
		this.ctx.font = "120pt Arial";
		this.ctx.translate(this.position.x, this.position.y); // moves coordinates to center of screen 
		this.ctx.fillText(Math.round(this.theta/2/Math.PI*360), -Math.min(this.ctx.measureText(Math.round(this.theta/2/Math.PI*360)).width, this.innerDiameter)/2 ,60, this.innerDiameter); // draws text in center
		this.ctx.rotate(this.theta); // rotates the coordinates
		this.ctx.drawImage(this.dialImage, -this.diameter/2, -this.diameter/2, this.diameter, this.diameter); // draws dial at center
		this.ctx.restore(); // restores rotation and location to default
	}

	/**
	 * Called when the canvas is clicked or pointer is click/moved, recognizes valid action and acts accordingly
	 * @param position is the position of the pointer event
	 */

	this.onStart = function(position) {

	}

	this.onMove = function(position) {
		var currentAngle;
		if (position.y < this.position.y){
			currentAngle = Math.PI/2-Math.atan((position.x - this.position.x)/ (position.y - this.position.y));
		} else {
			currentAngle = Math.PI/2*3-Math.atan((position.x - this.position.x)/ (position.y - this.position.y));
		}

		if (this.lastAngle == null){
			this.lastAngle = currentAngle;
		}

		if (position.distanceFrom(this.position) < this.outerDiameter/2 &&
			position.distanceFrom(this.position) > this.innerDiameter/2){
			this.theta+=currentAngle - this.lastAngle;
			if (this.theta < 0){
				this.theta += Math.PI*2;
			} else if (this.theta > Math.PI*2){
				this.theta -= Math.PI*2;
			}
			this.needsUpdate = this.theta != 0;
		} 
		this.lastAngle = currentAngle;
	}

	/**
	 * Ends control of the dial
	 */
	this.onEnd = function(position) {
		var returner = false;
		this.lastAngle = null;
		if (this.needsUpdate){
			returner = this.name + Math.round(this.theta/2/Math.PI*360);
		}
		return returner;
	}

	this.update = function() {
		this.needsUpdate = this.theta != 0;
		if (this.needsUpdate){
			this.theta = Math.max(this.theta - Math.PI/32, 0)
		}
	}
}

function Guide(canvas, name, diameter) {
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
	this.name = name;

	this.guide = new Image();
		this.guide.src = 'circle.png';

	this.diameter = diameter;

	this.selected = false;
	this.needsUpdate = false;
	this.position;

	this.draw = function() {
		if (this.selected){
			this.ctx.save();
			this.ctx.translate(this.position.x, this.position.y);
			this.ctx.globalAlpha = .3;
			this.ctx.drawImage(this.guide, -this.diameter/2, -this.diameter/2, this.diameter, this.diameter);
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
		return false;
	}

	this.update = function() {
		
	}
}

function Button(canvas, name, diameter, position, text) {
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
	this.name = name;

	this.buttonUp = new Image();
		this.buttonUp.src = 'buttonUp.png';
	this.buttonDown = new Image();
		this.buttonDown.src = 'buttonDown.png';

	this.diameter = diameter;
		this.outerDiameter = (this.buttonUp.width - 80)/this.buttonUp.width * this.diameter;

	this.position = position;
	this.selected = false;
	this.needsUpdate = false;
	this.text = text;

	this.draw = function() {
		this.ctx.save();
		this.ctx.font = "10pt Arial";
		this.ctx.setFillColor('white');
		this.ctx.translate(this.position.x, this.position.y);
		this.ctx.fillText(text, -this.ctx.measureText(text).width/2, 5);
		if (this.selected){
			this.ctx.drawImage(this.buttonDown, -this.diameter/2, -this.diameter/2, this.diameter, this.diameter); 
		} else {
			this.ctx.drawImage(this.buttonUp, -this.diameter/2, -this.diameter/2, this.diameter, this.diameter); 
		}
		this.ctx.restore();
	}

	this.onStart = function(position) {
		if (position.distanceFrom(this.position) < this.outerDiameter/2){
			this.selected = true;
		}
	}

	this.onMove = function(position) {

	}

	this.onEnd = function(position) {
		var returner = false;
		if (this.selected){
			returner = name;
			this.selected = false;
		}
		return returner;
	}

	this.update = function() {
		
	}
}