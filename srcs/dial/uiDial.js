/**
 * Creates a new Dial
 * @class represents a rotatable dial, and handles control of it
 * @param dCanvas, the canvas object the dial should go on
 * @param diameter, width and height of the dial image
 * @returns a Dial object
 */
function Dial(name, image, diameter, position) {

	// sets up canvas
	this.name = name;
	this.position = position;
	this.diameter = diameter;
		this.outerDiameter = (512 - 80)/512 * this.diameter;
		this.innerDiameter = (512 - 186)/512 * this.diameter;

	this.selected = false;
	this.needsUpdate = false;
	this.lastAngle;
	this.theta = 0;

	this.object = document.createElement('div');
		this.object.style.backgroundImage = "url(" + image + ")";
			this.object.style.backgroundSize = "contain";
		this.object.style.width = diameter + "px";
		this.object.style.height = diameter + "px";
		this.object.style.top = position.y - diameter/2 + "px";
		this.object.style.left = position.x - diameter/2 + "px";

		this.object.style.webkitTransformOrigin = "center center";
		this.object.style.webkitTransform = 'rotate(0deg)';

		this.object.innerHTML = Math.round(this.theta/Math.PI*180);
			this.object.style.color = "white";
			this.object.style.fontFamily = "Arial";
			this.object.style.fontSize = "120pt";
			this.object.style.textAlign = "center";

	this.set = function() {
		this.object.innerHTML = Math.round(this.theta/Math.PI*180);
		this.object.style.webkitTransform = 'rotate(' + this.theta/Math.PI * 180 + 'deg)';
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
		this.set();
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