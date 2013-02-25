function Dial(name, image, diameter, position) {
	this.name = name;
	this.position = position;
	this.diameter = diameter;
		this.outerDiameter = (512 - 80)/512 * this.diameter;
		this.innerDiameter = (512 - 186)/512 * this.diameter;

	this.selected = false;
	this.needsUpdate = false;
	this.lastAngle;
	this.filler = ["One More Night", "Payphone", "Daylight", "Lucky Strike", "The Man Who Never Lied", "Love Somebody", "Ladykiller", "Fortune Teller", "Sad", "Tickets", "Doin' Dirt", "Beautiful Goodbye", "Wipe Your Eyes", "Wasted Years", "Let's Stay Together", "Misery", "Give a Little More", "Stutter", "Don't Know Nothing", "Never Gonna Leave This Bed", "I Can't Lie", "Hands All Over", "How", "Get Back In My Life", "Just a Feeling", "Runaway", "Moves Like Jagger", "Harder to Breathe", "This Love", "Shiver", "She Will Be Loved", "Tangled", "The Sun", "Must Get Out", "Sunday Morning", "Secret", "Through With You", "Not Coming Home", "Sweetest Goodbye", "Mylo Xyloto", "Hurts Like Heaven", "Paradise", "Charlie Brown", "Us Against the World", "M.M.I.X.", "Every Teardrop Is a Watterfall", "Major Minus", "U.F.O.", "Princesses of China", "Up in Flames", "A Hopeful Transmission", "Don't Let It Break Your Heart", "Up With the Birds", "Politik", "In My Place", "God Put A Smile Upon Your Face", "The Scientist", "Clocks", "Daylight", "Green Eyes", "Warning Sign", "A Whisper", "A Rush Of Blood To The Head", "Amsterdam", "Life In Technicolor", "Cemeteries of London", "Lost!", "42", "Lovers In Japan / Reign of Love", "Yes", "Viva la Vida", "Violet Hill", "Strawberry Swing", "Death and All His Friends", "Lost?", "Square One", "What If", "White Shadows", "Fix You", "Talk", "X & Y", "Speed of Sound", "A Message", "Low", "The Hardest Part", "Swallowed In the Sea", "Twisted Logic", "Till Kingdom Come"];

	// things to be setup
	this.theta;
	this.object;
	this.background;
	this.outerLoop;
	this.options;

	this.setUp = function() {
		var parent;
		var zIndex;

		this.theta = 0;

		if (this.object) {
			parent = this.object.parentElement;
			zIndex = parseInt(this.object.style.zIndex);
			this.object.remove();
		}
		this.object = document.createElement('div');
		this.object.style.width = diameter + "px";
		this.object.style.height = diameter + "px";
		this.object.style.backgroundImage = "url(" + image + ")";
			this.object.style.backgroundSize = "contain";
		this.object.style.webkitTransformOrigin = "center center";
		this.object.style.webkitTransform = "translate(" + (this.position.x - diameter/2) + "px, " + (this.position.y - diameter/2) + "px) rotate(" + this.theta / Math.PI *180 + "deg)";

		if (this.background) {
			this.background.remove();
		}
		this.background = document.createElement('div');
		this.background.style.width = this.innerDiameter + "px";
		this.background.style.height = this.innerDiameter + "px";
		this.background.style.backgroundImage = "url(http://upload.wikimedia.org/wikipedia/en/e/e8/Maroon-5-overexposed.jpg)";
		this.background.style.backgroundSize = "contain";
		this.background.style.borderRadius = this.innerDiameter/2 + "px";
		this.background.style.webkitTransform = "translate(" + (this.position.x - this.innerDiameter/2) + "px, " + (this.position.y-this.innerDiameter/2) + "px)";

		if (this.outerLoop) {
			this.outerLoop.remove();
		}
		this.outerLoop = document.createElement('div');
		this.outerLoop.style.width = this.outerLoop.style.height = diameter + 100 + "px";
		this.outerLoop.style.borderRadius = (diameter + 100)/2 + "px";
			this.outerLoop.style.border = "solid 5px white";
			this.outerLoop.style.borderBottom = "none 0px black";
			this.outerLoop.style.opacity = ".3";
		this.outerLoop.style.webkitTransform = "translate(" + (this.position.x - (diameter+100)/2) + "px, " + (this.position.y - (diameter+100)/2) + "px)";

		if (this.options) {
			for (var i = 0; i < this.options.length; i++) {
				this.options[i].remove();
			}
		}
		this.options = new Array(9);
		for (var i = 0; i < this.options.length; i++) {
			this.options[i] = document.createElement('div');
				this.options[i].style.width = "150px";
				this.options[i].style.webkitTransform = "translate(" + (-Math.cos(Math.PI/6*i - Math.PI/6 + this.theta%(Math.PI/6)) * 250 + this.position.x - 75) + "px, " + (-Math.sin(Math.PI/6*i - Math.PI/6 + this.theta%(Math.PI/6)) * 250 + this.position.y) + "px)";
				this.options[i].style.textAlign = "center";
				this.options[i].style.color = "grey";
				this.options[i].style.fontFamily = "arial";
				this.options[i].style.fontSize = "16pt";
		}

		this.set();
		if (parent) {
			this.onAdd(parent, zIndex);
		}
	}

	this.set = function() {
		console.log(this.theta/Math.PI*180%30);
		this.object.style.webkitTransform = "translate(" + (this.position.x - diameter/2) + "px, " + (this.position.y - diameter/2) + "px) rotate(" + this.theta / Math.PI *180 + "deg)";
		for (var i = 0; i < this.options.length; i++) {
			this.options[i].innerHTML = this.filler[this.offset(i)];
			this.options[i].style.webkitTransform = "translate(" + (-Math.cos(Math.PI/6*i - Math.PI/6 + this.theta%(Math.PI/6)) * 250 + this.position.x - 75) + "px, " + (-Math.sin(Math.PI/6*i - Math.PI/6 + this.theta%(Math.PI/6)) * 250 + this.position.y) + "px)";
		}
		this.options[4].style.fontSize = "20pt";
		this.options[4].style.textWeight = "bold";
		this.options[4].style.color = "white";
		this.needsUpdate = this.theta%(Math.PI/6) != 0;
	}

	this.offset = function(index) {
		var offset = -Math.floor(this.theta/Math.PI*180/30) - 4;
		if (index + offset < 0) {
			return this.filler.length + (index + offset)%this.filler.length;
		} else if (index + offset >= this.filler.length) {
			return (index + offset)%this.filler.length;
		}
		return index + offset;

	}
	
	this.onStart = function(position) {
		this.lastAngle = null;
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
		if (this.theta%(Math.PI/6) < Math.PI/6/2) {
			this.theta-= this.theta%(Math.PI/6);
		} else {
			this.theta+= Math.PI/6 - this.theta%(Math.PI/6);
		}
		this.set();
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

		this.background.style.zIndex = zIndex++;
		parent.appendChild(this.background);
		return zIndex;
	}

	this.setUp();
	this.set();
}