/**
 * Creates a new Dial
 * @class represents a rotatable dial, and handles control of it
 * @param dCanvas, the canvas object the dial should go on
 * @param diameter, width and height of the dial image
 * @returns a Dial object
 */

function Dial(dCanvas, diameter, position) {

	// sets up canvas
	this.canvas = dCanvas;
	this.ctx = dCanvas.getContext('2d');
		this.ctx.setFillColor('white');
		this.ctx.font = "120pt Arial";

	// load dial image
	this.dialImage = new Image();
		this.dialImage.src = 'dial.png';

	// calculates limits for selecting the dial based off of image diameter
	this.diameter = diameter;
		this.outerDiameter = (this.dialImage.width - 80)/this.dialImage.width * this.diameter;
		this.innerDiameter = (this.dialImage.width - 186)/this.dialImage.width * this.diameter;

	this.position = position;
	this.selected = false;
	this.lastAngle;
	this.theta = 0;

	/**
	 * Draws the dial
	 */
	this.draw = function() {
		this.ctx.save(); // saves rotatation and location at default
		this.ctx.translate(this.position.x, this.position.y); // moves coordinates to center of screen 
		this.ctx.fillText(Math.round(this.theta/2/Math.PI*360), -this.ctx.measureText(Math.round(this.theta/2/Math.PI*360)).width/2 ,60); // draws text in center
		this.ctx.rotate(this.theta); // rotates the coordinates
		this.ctx.drawImage(this.dialImage, -this.diameter/2, -this.diameter/2, this.diameter, this.diameter); // draws dial at center
		this.ctx.restore(); // restores rotation and location to default
	}

	/**
	 * Called when the canvas is clicked or pointer is click/moved, recognizes valid action and acts accordingly
	 * @param position is the position of the pointer event
	 */

	this.onStart = function(position) {
		if (position.distanceFrom(this.position) < this.outerDiameter/2 &&
			position.distanceFrom(this.position) > this.innerDiameter/2){
			this.selected = true;
			if (position.y < this.position.y){
				this.lastAngle = Math.PI/2-Math.atan((position.x - this.position.x)/ (position.y - this.position.y));
			} else {
				this.lastAngle = Math.PI/2*3-Math.atan((position.x - this.position.x)/ (position.y - this.position.y));
			}
		}
	}

	this.onMove = function(position) {
		if (this.selected){
			var currentAngle;
			if (position.y < this.position.y){
				currentAngle = Math.PI/2-Math.atan((position.x - this.position.x)/ (position.y - this.position.y));
			} else {
				currentAngle = Math.PI/2*3-Math.atan((position.x - this.position.x)/ (position.y - this.position.y));
			}

			this.theta+=currentAngle - this.lastAngle;
			if (this.theta < 0){
				this.theta += Math.PI*2;
			} else if (this.theta > Math.PI*2){
				this.theta -= Math.PI*2;
			}
			this.lastAngle = currentAngle;
			this.draw();
		// if the dial is uncontrolled
		}
	}

	/**
	 * Ends control of the dial
	 */
	this.onEnd = function() {
		this.selected = false;
	}
}