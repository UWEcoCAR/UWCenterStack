function Slider(name, sliderImage, sliderDiameter, position, diameter, startAngle, options, isRightSide) {
	this.name = name;
	this.sliderImage = sliderImage;
		this.sliderDiameter = sliderDiameter;
		this.outerDiameter = (512 - 80)/512 * this.sliderDiameter;
	this.position = position;
	this.sliderPosition = new Position(0,this.position.y); // is immediately overwritten by last line
	this.diameter = diameter;
		this.x = 25;
	this.startAngle = startAngle;
		this.max = Math.sin(this.startAngle) * this.diameter + this.position.y;
		this.min = Math.sin(this.startAngle - Math.PI/2) * this.diameter + this.position.y;
	this.options = options;
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
		this.overlay.style.width = (diameter + this.x) * 2 + "px";
		this.overlay.style.height = (diameter + this.x) * 2 + "px";
		this.overlay.style.backgroundImage = "url(" + "sliderbg.png" + ")";
			this.overlay.style.opacity = ".4";
			this.overlay.style.backgroundSize = "contain";
		if (this.isRightSide){
			this.overlay.style.webkitTransform = "translate(" + (this.position.x - diameter - this.x) + "px, " + (this.position.y - diameter - this.x) + "px)";
		} else {
			this.overlay.style.webkitTransform = "translate(" + (this.position.x - diameter - this.x) + "px, " + (this.position.y - diameter - this.x) + "px) rotate(180deg)";
		}

	if (this.options != 0) {
		this.targets = new Array(this.options);
		this.targetHeights = new Array(this.options);
		for (var i = 0; i < this.targets.length; i++) {
			this.targets[i] = document.createElement('div');
			this.targets[i].style.height = "20px";
			this.targets[i].style.width = "20px";
			this.targets[i].style.backgroundImage = "url(" + this.sliderImage + ")";
				this.targets[i].style.backgroundSize = "contain";
			var y =  this.min + i * (this.max - this.min) / (this.options - 1) - 10;
			var x = -Math.cos(Math.asin((y - this.position.y)/this.diameter)) * this.diameter + this.position.x - 10;
			this.targets[i].style.webkitTransform = "translate(" + x + "px, " + y + "px)";
			this.targetHeights[i] = y;
		}
	}



	// this.filler = document.createElement('div');


	this.set = function() {
		this.sliderPosition.x = Math.cos(Math.asin((this.sliderPosition.y - this.position.y)/this.diameter)) * this.diameter;
		if (!this.isRightSide) {
			this.sliderPosition.x = -this.sliderPosition.x;
		}
		this.slider.style.webkitTransform = "translate(" + (this.position.x + this.sliderPosition.x - this.sliderDiameter/2) + "px, " + (this.sliderPosition.y - this.sliderDiameter/2) + "px)";
		
		if (this.targets){
			this.needsUpdate = true;
			for (var i = 0; i < this.targetHeights.length; i++) {
					this.needsUpdate = this.needsUpdate && Math.round(this.sliderPosition.y/10) != Math.round(this.targetHeights[i]/10);
			}
		}
	}

	this.onStart = function(position) {
		this.selected = position.distanceFrom(new Position(this.sliderPosition.x + this.position.x, this.sliderPosition.y)) < this.outerDiameter/2;
		if (this.selected) {
			lastClick = position.y
		}
	}

	this.onMove = function(position) {
		if (this.selected) {
			this.sliderPosition.y = Math.min(Math.max(this.sliderPosition.y + position.y - lastClick, this.min), this.max);
			lastClick = position.y;
			this.set();
		}
	}

	this.onEnd = function(position) {
	}

	this.update = function() {
		if (this.needsUpdate) {
			this.sliderPosition.y = this.sliderPosition.y - 10;
			this.set();
		}
	}

	this.onAdd = function(parent, zIndex) {
		this.slider.style.zIndex = zIndex++;
		parent.appendChild(this.slider);

		this.overlay.style.zIndex = zIndex++;
		parent.appendChild(this.overlay);

		if (this.options != 0) {
			for (var i = 0; i < this.targets.length; i++) {
				this.targets[i].style.zIndex = zIndex++;
				parent.appendChild(this.targets[i]);
			}
		}
		return zIndex;
	}

	this.set();
}