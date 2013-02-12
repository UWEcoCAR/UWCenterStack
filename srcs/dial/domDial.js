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
	this.filler = ["One More Night", "Payphone", "Daylight", "Lucky Strike", "The Man Who Never Lied", "Love Somebody", "Ladykiller", "Fortune Teller", "Sad", "Tickets", "Doin' Dirt", "Beautiful Goodbye", "Wipe Your Eyes", "Wasted Years", "Let's Stay Together", "Misery", "Give a Little More", "Stutter", "Don't Know Nothing", "Never Gonna Leave This Bed", "I Can't Lie", "Hands All Over", "How", "Get Back In My Life", "Just a Feeling", "Runaway", "Moves Like Jagger", "Harder to Breathe", "This Love", "Shiver", "She Will Be Loved", "Tangled", "The Sun", "Must Get Out", "Sunday Morning", "Secret", "Through With You", "Not Coming Home", "Sweetest Goodbye", "Mylo Xyloto", "Hurts Like Heaven", "Paradise", "Charlie Brown", "Us Against the World", "M.M.I.X.", "Every Teardrop Is a Watterfall", "Major Minus", "U.F.O.", "Princesses of China", "Up in Flames", "A Hopeful Transmission", "Don't Let It Break Your Heart", "Up With the Birds", "Politik", "In My Place", "God Put A Smile Upon Your Face", "The Scientist", "Clocks", "Daylight", "Green Eyes", "Warning Sign", "A Whisper", "A Rush Of Blood To The Head", "Amsterdam", "Life In Technicolor", "Cemeteries of London", "Lost!", "42", "Lovers In Japan / Reign of Love", "Yes", "Viva la Vida", "Violet Hill", "Strawberry Swing", "Death and All His Friends", "Lost?", "Square One", "What If", "White Shadows", "Fix You", "Talk", "X & Y", "Speed of Sound", "A Message", "Low", "The Hardest Part", "Swallowed In the Sea", "Twisted Logic", "Till Kingdom Come"];
	for (var i = 0; i < this.options.length; i++) {
		this.options[i] = document.createElement('div');
			this.options[i].style.width = "150px";
			this.options[i].style.webkitTransform = "translate(" + (-Math.cos(Math.PI/6*i - Math.PI/6) * 250 + this.position.x - 75) + "px, " + (-Math.sin(Math.PI/6*i - Math.PI/6) * 250 + this.position.y) + "px)";
			this.options[i].style.textAlign = "center";
			this.options[i].style.color = "grey";
			this.options[i].style.fontFamily = "arial";
			this.options[i].style.fontSize = "16pt";
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
		this.options[4].style.fontSize = "20pt";
		this.options[4].style.textWeight = "bold";
		this.options[4].style.color = "white";
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