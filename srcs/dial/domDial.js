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

	this.options = new Array(9);
	this.filler = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	for (var i = 0; i < this.options.length; i++) {
		this.options[i] = document.createElement('div');
			this.options[i].style.width = "150px";
			this.options[i].style.webkitTransform = "translate(" + (-Math.cos(Math.PI/6*i - Math.PI/6) * 250 + this.position.x - 75) + "px, " + (-Math.sin(Math.PI/6*i - Math.PI/6) * 250 + this.position.y) + "px)";
			this.options[i].style.textAlign = "center";
			this.options[i].style.color = "white";
			this.options[i].style.fontFamily = "arial";
			this.options[i].style.fontSize = "20pt";
	}

	this.outerLoop = document.createElement('div');
		this.outerLoop.style.width = this.outerLoop.style.height = diameter + 100 + "px";
		this.outerLoop.style.borderRadius = (diameter + 100)/2 + "px";
			this.outerLoop.style.border = "solid 5px white";
			this.outerLoop.style.borderBottom = "none 0px black";
			this.outerLoop.style.opacity = ".3";
		this.outerLoop.style.webkitTransform = "translate(" + (this.position.x - (diameter+100)/2) + "px, " + (this.position.y - (diameter+100)/2) + "px)";

	this.set = function() {
		this.object.style.webkitTransform = "translate(" + (this.position.x - diameter/2) + "px, " + (this.position.y - diameter/2) + "px) rotate(" + this.theta / Math.PI *180 + "deg)";
		for (var i = 0; i < this.options.length; i++) {
			this.options[i].innerHTML = this.filler[this.offset(i)];
		}
	}

	this.offset = function(index) {
		var offset = -Math.round(this.theta/Math.PI*180/30) - 4;
		if (index + offset < 0) {
			return this.filler.length + (index + offset)%this.filler.length;
		} else if (index + offset >= this.filler.length) {
			return (index + offset)%this.filler.length;
		}
		return index + offset;

	}
	
	this.onStart = function(position) {

	}

	this.onMove = function(position) {
		var currentAngle = Math.atan2(-position.x + this.position.x, position.y - this.position.y) + Math.PI;

		if (this.lastAngle == null){
			this.lastAngle = currentAngle;
		}

		if (position.distanceFrom(this.position) < this.outerDiameter/2 &&
			position.distanceFrom(this.position) > this.innerDiameter/2){
				this.theta+= currentAngle - this.lastAngle;
				if (currentAngle-this.lastAngle > Math.PI) {
					this.theta-=Math.PI*2;
				} else if (currentAngle-this.lastAngle < -Math.PI) {
					this.theta+=Math.PI*2;
				}
				this.set();
		}
		this.lastAngle = currentAngle;
	}

	this.onEnd = function() {

	}

	this.update = function() {

	}

	this.onAdd = function(parent, zIndex) {
		this.object.style.zIndex = zIndex++;
		parent.appendChild(this.object);

		for (var i = 0; i < this.options.length; i++) {
			this.options[i].style.zIndex = zIndex++;
			parent.appendChild(this.options[i]);
		}

		this.outerLoop.style.zIndex = zIndex++;
		parent.appendChild(this.outerLoop);
		return zIndex;
	}
}