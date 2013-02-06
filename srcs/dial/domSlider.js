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
	this.lastClick;

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

	if (this.options) {
		this.targets = new Array(this.options.length);
		this.targetHeights = new Array(this.options.length);
		this.titles = new Array(this.options.length);
		for (var i = 0; i < this.targets.length; i++) {
			this.targets[i] = document.createElement('div');
				this.targets[i].style.height = this.targets[i].style.width = "20px";
				this.targets[i].style.backgroundImage = "url(" + this.sliderImage + ")";
					this.targets[i].style.backgroundSize = "contain";
				var rotation = this.startAngle - this.startAngle*2/(this.options.length - 1) * i;
				this.targets[i].style.webkitTransformOrigin = this.diameter + "px center";
				this.targets[i].style.webkitTransform = "translate(" + (width/2 - this.diameter + (this.isRightSide?10:-10)) + "px, " + (height/2 - 10) + "px) rotate(" + (rotation/Math.PI*180 + (this.isRightSide?180:0)) + "deg)";
				this.targetHeights[i] = Math.sin(rotation) * this.diameter + this.position.y;

			this.titles[i] = document.createElement('div');
				this.titles[i].innerHTML = this.options[i];
					this.titles[i].style.fontFamily = "Arial";
					this.titles[i].style.fontSize = "20pt";
					this.titles[i].style.color = "white";
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
				this.needsUpdate = this.needsUpdate && this.sliderPosition.y != this.targetHeights[i];
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
			var index = 0;
			var distance = Math.abs(this.targetHeights[0] - this.sliderPosition.y);
			for (var i = 1; i < this.targetHeights.length; i++) {
				if (distance > Math.abs(this.targetHeights[i] - this.sliderPosition.y)) {
					index = i;
					distance = Math.abs(this.targetHeights[i] - this.sliderPosition.y);
				}
			}
			this.sliderPosition.y = this.targetHeights[index];
			this.set();
			this.needsUpdate = false;
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
				var rotation = this.startAngle - this.startAngle*2/(this.options.length - 1) * i;
				this.titles[i].style.zIndex = zIndex++;
				parent.appendChild(this.titles[i]);
				var x = Math.cos(rotation)*this.diameter + (this.isRightSide?this.titles[i].clientWidth*.7:this.titles[i].clientWidth*1.7);
				var y = Math.sin(rotation)*this.diameter + this.position.y - this.titles[i].clientHeight/2;
				this.titles[i].style.webkitTransform = "translate(" + (this.position.x + (this.isRightSide?x:-x)) + "px, " + (y) + "px)";
			}
		}
		return zIndex;
	}
	this.set();
}