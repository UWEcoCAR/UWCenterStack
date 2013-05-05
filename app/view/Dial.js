Ext.define('feel-your-way.view.Dial', {
	extend: 'Ext.Img',
	xtype: 'dial',

	config: {
		src: 'resources/icons/graphics/outer_circle.png',
		diameter: 100,
		innerDiameter: 0,
		outerDiameter: Number.MAX_VALUE,
		theta: 0,
		lastAngle: null,
		rotatable: true,
	},

	initialize: function() {
		this.callParent();

		var diameter = this.getDiameter();
		this.setWidth(diameter);
		this.setHeight(diameter);
		this.setInnerDiameter((279 - 10 - 40)/279 * diameter);
		this.setOuterDiameter((279 - 1 + 40)/279 * diameter);
	},

	onStart: function(event, element) {
		this.setLastAngle(null);
	},

	onMove: function(event, element) {
		var relLoc = this.getRelativePosition(event, element);
		var currentAngle = Math.atan2(-relLoc.x, relLoc.y) + Math.PI;

		if (this.getLastAngle() === null) {
			this.setLastAngle(currentAngle);
		}

		var distance = Math.sqrt(Math.pow(relLoc.x, 2) + Math.pow(relLoc.y, 2));
		if(distance > this.getInnerDiameter()/2 && distance < this.getOuterDiameter()/2){
			if (this.getRotatable()){

				var deltaTheta = currentAngle - this.getLastAngle();

				if ((deltaTheta >= 0 && this.getRotatable() !== 'left') || (deltaTheta <= 0 && this.getRotatable() !== 'right')){
					this.setTheta(this.getTheta() + deltaTheta);

					if (currentAngle - this.getLastAngle() > Math.PI) {
					this.setTheta(this.getTheta() - Math.PI*2);
					} else if (currentAngle - this.getLastAngle() < -Math.PI) {
						this.setTheta(this.getTheta() + Math.PI*2);
					}
				}
			}
		}
		this.setLastAngle(currentAngle);
		this.set();
		this.fireEvent('dialrotate', -this.getTheta(), this);
	},

	onEnd: function(event, element) {
		this.fireEvent('restore', this.getTheta(), this);
	},

	set: function() {
		// this.element.dom.style.webkitTransform = 'rotate(' + this.getTheta()/Math.PI*180 + 'deg)';
	},

	getRelativePosition: function(event, element) {
		var el = Ext.get(element).findParent('.multidial');
		return new Ext.util.Point(event.pageX - el.offsetLeft - el.offsetWidth/2, event.pageY - el.offsetTop - el.offsetHeight/2);
	}
})