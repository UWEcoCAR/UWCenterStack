/**
 * Creates a new Dial
 * @class represents a rotatable dial, and handles control of it
 * @param dCanvas, the canvas object the dial should go on
 * @param diameter, width and height of the dial image
 * @returns a Dial object
 */
function Dial(ctx, name, image, diameter, position) {

	// sets up canvas
	this.ctx = ctx;
	this.name = name;
	this.image = image;
	this.position = position;
	this.diameter = diameter;
		this.outerDiameter = (this.image.width - 80)/this.image.width * this.diameter;
		this.innerDiameter = (this.image.width - 186)/this.image.width * this.diameter;

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
		this.ctx.drawImage(this.image, -this.diameter/2, -this.diameter/2, this.diameter, this.diameter); // draws dial at center
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
		} 
		this.lastAngle = currentAngle;
		return Math.round(this.theta/2/Math.PI*360);
	}

	/**
	 * Ends control of the dial
	 */
	this.onEnd = function(position) {
	
	}

	this.update = function() {
		
	}
}