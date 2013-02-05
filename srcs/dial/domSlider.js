function Slider(name, sliderImage, sliderDiameter, position, diameter, startAngle, isRightSide) {
	this.name = name;
	this.sliderImage = sliderImage;
		this.sliderDiameter = sliderDiameter;
		this.outerDiameter = (512 - 80)/512 * this.sliderDiameter;
	this.position = position;
	this.sliderPosition = new Position(0,this.position.y); // is immediately overwritten by last line
	this.diameter = diameter;
	this.startAngle = startAngle;
		this.max = Math.sin(this.startAngle) * this.diameter + this.position.y;
		this.min = Math.sin(this.startAngle - Math.PI/2) * this.diameter + this.position.y;
	this.isRightSide = isRightSide;

	this.selected = false;
	this.needsUpdate = false;
	this.drag; // ?
	this.lastClick; // ?

	this.slider = document.createElement('div');
		this.slider.style.width = sliderDiameter + "px";
		this.slider.style.height = sliderDiameter + "px";
		this.slider.style.backgroundImage = "url(" + this.sliderImage + ")";
			this.slider.style.backgroundSize = "contain";

	this.overlay = document.createElement('div');
		this.overlay.style.width = diameter * 2 + "px";
		this.overlay.style.height = diameter * 2 + "px";
		this.overlay.style.backgroundImage = "url(" + "sliderbg.png" + ")";
			this.overlay.style.opacity = ".4";
			this.overlay.style.backgroundSize = "contain";
		if (this.isRightSide){
			this.overlay.style.webkitTransform = "translate(" + (this.position.x - diameter) + "px, " + (this.position.y - diameter) + "px)";
		} else {
			this.overlay.style.webkitTransform = "translate(" + (this.position.x - diameter) + "px, " + (this.position.y - diameter) + "px) rotate(180deg)";
		}


	// this.filler = document.createElement('div');


	this.set = function() {
		this.sliderPosition.x = Math.cos(Math.asin((this.sliderPosition.y - this.position.y)/this.diameter)) * this.diameter;
		if (!this.isRightSide) {
			this.sliderPosition.x = -this.sliderPosition.x;
		}
		this.slider.style.webkitTransform = "translate(" + (this.position.x + this.sliderPosition.x - this.sliderDiameter/2) + "px, " + (this.sliderPosition.y - this.sliderDiameter/2) + "px)";
	}

	this.onStart = function(position) {
		this.selected = position.distanceFrom(new Position(this.sliderPosition.x + this.position.x, this.sliderPosition.y)) < this.outerDiameter/2;
		if (this.selected) {
			lastClick = position.y
		}
		this.set();
	}

	this.onMove = function(position) {
		if (this.selected) {
			this.sliderPosition.y = Math.min(Math.max(this.sliderPosition.y + position.y - lastClick, this.min), this.max);
			lastClick = position.y;
		}
		this.set();
	}

	this.onEnd = function(position) {
		this.set();
	}

	this.update = function() {

	}

	this.onAdd = function(parent, zIndex) {
		this.slider.style.zIndex = zIndex++;
		parent.appendChild(this.slider);

		this.overlay.style.zIndex = zIndex++;
		parent.appendChild(this.overlay);
		return zIndex;
	}

	this.set();
}