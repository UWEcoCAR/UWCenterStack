function Dial(name, image, diameter, position) {
	this.name = name;
	this.position = position;
	this.diameter = diameter;
		this.outerDiameter = (512 - 80)/512 * this.diameter;
		this.innerDiameter = (512 - 186)/512 * this.diameter;

	this.selected = false;
	this.needsUpdate = false;
	this.theta = 0;
	this.lastAngle;

	this.object = document.createElement('div');
		this.object.style.width = diameter + "px";
		this.object.style.height = diameter + "px";
		this.object.style.backgroundImage = "url(" + image + ")";
			this.object.style.backgroundSize = "contain";
		this.object.style.webkitTransformOrigin = "center center";
		this.object.style.webkitTransform = "translate(" + (this.position.x - diameter/2) + "px, " + (this.position.y - diameter/2) + "px) rotate(" + this.theta / Math.PI *180 + "deg)";

	this.text = document.createElement('div');
		this.text.style.width = diameter + "px";
		this.text.style.webkitTransform = "translate(" + (this.position.x - diameter/2) + "px, " + (this.position.y - diameter/2 + 115) + "px)";

		this.text.style.fontFamily = "Arial";
		this.text.style.fontSize = "110pt";
		this.text.style.color = "white";
		this.text.style.textAlign = "center";
		this.text.innerHTML = 0;

	this.outerLoop = document.createElement('div');
		this.outerLoop.style.width = this.outerLoop.style.height = diameter + 100 + "px";
		this.outerLoop.style.borderRadius = (diameter + 100)/2 + "px";
			this.outerLoop.style.border = "solid 5px white";
			this.outerLoop.style.borderBottom = "none 0px black";
			this.outerLoop.style.opacity = ".3";
		this.outerLoop.style.webkitTransform = "translate(" + (this.position.x - (diameter+100)/2) + "px, " + (this.position.y - (diameter+100)/2) + "px)";

	this.set = function() {
		this.object.style.webkitTransform = "translate(" + (this.position.x - diameter/2) + "px, " + (this.position.y - diameter/2) + "px) rotate(" + this.theta / Math.PI *180 + "deg)";
		this.text.innerHTML = Math.round(this.theta/Math.PI * 180);
	}
	
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

	this.onEnd = function() {

	}

	this.update = function() {

	}

	this.onAdd = function(parent, zIndex) {
		this.object.style.zIndex = zIndex++;
		parent.appendChild(this.object);

		this.text.style.zIndex = zIndex++;
		parent.appendChild(this.text);

		this.outerLoop.style.zIndex = zIndex++;
		parent.appendChild(this.outerLoop);
		return zIndex;
	}
}