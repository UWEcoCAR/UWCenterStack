	function VerticalSlider(name, sliderImage, sliderDiameter, position, diameter, startAngle, options, isTop) {
		this.name = name;
		this.sliderImage = sliderImage;
			this.sliderDiameter = sliderDiameter;
			this.outerDiameter = (512 - 80)/512 * this.sliderDiameter;
		this.position = position;
		this.sliderPosition = new Position(this.position.x, 0); // y value is immediately overwritten by last line
		this.diameter = diameter;
			this.outDiameter = diameter + 25;
			this.innerDiameter = (1024 - 100)/1024 * this.diameter;
			this.x = 25;
		this.startAngle = startAngle;
			this.max = Math.sin(this.startAngle) * this.diameter + this.position.x;
			this.min = Math.sin(-this.startAngle) * this.diameter + this.position.x;
		this.options = options;
		this.isTop = isTop;

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
			if (this.isTop){
				this.overlay.style.webkitTransform = "translate(" + (this.position.x - diameter - this.x) + "px, " + (this.position.y - diameter - this.x) + "px) rotate(270deg)";
			} else {
				this.overlay.style.webkitTransform = "translate(" + (this.position.x - diameter - this.x) + "px, " + (this.position.y - diameter - this.x) + "px) rotate(90deg)";
			}

		if (this.options) {
			this.targets = new Array(this.options.length);
			this.targetHeights = new Array(this.options.length);
			this.titles = new Array(this.options.length);
			for(var i = 0; i < this.targets.length; i++) {
				this.targets[i] = document.createElement('div');
				this.targets[i].style.height = this.targets[i].style.width = "20px";
				this.targets[i].style.backgroundImage = "url(" + this.sliderImage + ")";
					this.targets[i].style.backgroundSize = "contain";
				var rotation = this.startAngle - this.startAngle*2/(this.options.length - 1) * i;
				this.targets[i].style.webkitTransformOrigin = this.diameter + "px center";
				this.targets[i].style.webkitTransform = "translate(" + (this.position.x - this.diameter) + "px, " + (this.position.y - 20) + "px) rotate(" + (rotation/Math.PI*180 + (this.isTop?90:270)) + "deg)";
				this.targetHeights[i] = Math.sin(rotation) * this.diameter + this.position.x;

				if (this.options[i] == null) {
					this.targetHeights[i] = Number.MAX_VALUE;
					this.targets[i].style.display = "none";
				}
			}
		}

		this.set = function() {
			this.sliderPosition.y = Math.sin(Math.acos((this.sliderPosition.x - this.position.x)/this.diameter)) * this.diameter;
			if (this.isTop) {
				this.sliderPosition.y = -this.sliderPosition.y;
			}
			this.slider.style.webkitTransform = "translate(" + (this.sliderPosition.x - this.sliderDiameter/2) + "px, " + (this.position.y + this.sliderPosition.y - this.sliderDiameter/2) + "px)";
		}

		this.onStart = function(position) {
			if (this.options && position.x >= this.min && position.x <= this.max &&
				position.distanceFrom(this.position) <= this.outDiameter &&
				position.distanceFrom(this.position) >= this.innerDiameter) {
					this.sliderPosition.x = position.x;
					this.set();
			}

			this.selected = position.distanceFrom(new Position(this.sliderPosition.x, this.sliderPosition.y + this.position.y)) < this.outerDiameter/2;
			if (this.selected) {
				lastClick = position.x;
			}
		}

		this.onMove = function(position) {
			if (this.selected) {
				this.sliderPosition.x = Math.min(Math.max(this.sliderPosition.x + position.x - lastClick, this.min), this.max);
				lastClick = position.x;
				this.set();
			}
		}

		this.onEnd = function() {
			if (this.targets){
				this.needsUpdate = true;
				for (var i = 0; i < this.targetHeights.length; i++) {
					this.needsUpdate = this.needsUpdate && this.sliderPosition.x != this.targetHeights[i];
				}
			}
		}

		this.update = function() {
			if (this.needsUpdate) {
				var index = 0;
				var distance = Math.abs(this.targetHeights[0] - this.sliderPosition.x);
				for (var i = 1; i < this.targetHeights.length; i++) {
					if (distance > Math.abs(this.targetHeights[i] - this.sliderPosition.x)) {
						index = i;
						distance = Math.abs(this.targetHeights[i] - this.sliderPosition.x);
					}
				}
				if (distance < 10) {
					this.sliderPosition.x = this.targetHeights[index];
					this.set();
					this.needsUpdate = false;
				} else {
					if (this.sliderPosition.x < this.targetHeights[index]) {
						this.sliderPosition.x +=10;
					} else {
						this.sliderPosition.x -=10;
					}
					this.set();
				}
			}
		}

		this.onAdd = function(parent, zIndex) {
		if (this.options) {
			for (var i = 0; i < this.targets.length; i++) {
				this.targets[i].style.zIndex = zIndex++;
				parent.appendChild(this.targets[i]);
				// var rotation = this.startAngle - this.startAngle*2/(this.options.length - 1) * i;
				// this.titles[i].style.zIndex = zIndex++;
				// parent.appendChild(this.titles[i]);
				// var x = Math.cos(rotation)*this.diameter + (this.?this.titles[i].clientWidth*.7:this.titles[i].clientWidth*1.7);
				// var y = Math.sin(rotation)*this.diameter + this.position.y - this.titles[i].clientHeight/2;
				// this.titles[i].style.webkitTransform = "translate(" + (this.position.x + (this.isRightSide?x:-x)) + "px, " + (y) + "px)";
			}
		}

		this.slider.style.zIndex = zIndex++;
		parent.appendChild(this.slider);

		this.overlay.style.zIndex = zIndex++;
		parent.appendChild(this.overlay);

		return zIndex;
		}
		this.set();
	}