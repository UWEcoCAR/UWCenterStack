function Button(name, image1, image2, diameter, position) {
	this.name = name;
	this.image1 = image1;
	this.image2 = image2;
	this.position = position;
	this.diameter = diameter;
		this.outerDiameter = (512 - 80)/512 * this.diameter;

	this.selected = false;
	this.needsUpdate = false;

	this.object = document.createElement('div');
		this.object.style.width = diameter + "px";
		this.object.style.height = diameter + "px";
		this.object.style.backgroundImage = "url(" + this.image1 + ")";
			this.object.style.backgroundSize = "contain";
		this.object.style.webkitTransform = "translate(" + (this.position.x - diameter/2) + "px, " + (this.position.y - diameter/2) + "px)";

		this.set = function() {
			this.object.style.backgroundImage = "url(" + (this.selected?this.image2:this.image1) + ")";
		}

		this.onStart = function(position) {
			this.selected = position.distanceFrom(this.position) < this.outerDiameter/2;
			this.set();
		}

		this.onMove = function(position) {
			this.selected = this.selected && position.distanceFrom(this.position) < this.outerDiameter/2;
			this.set();
		}

		this.onEnd = function() {
			if (this.selected){
				this.selected = false;
				this.set();
				return name;
			}
		}

		this.update = function() {

		}

		this.onAdd = function(parent, zIndex) {
			this.object.style.zIndex = zIndex++;
			parent.appendChild(this.object);
			return zIndex;
		}
}