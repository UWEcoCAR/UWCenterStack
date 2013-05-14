Ext.define('UWCenterStack.view.Dial', {
	extend: 'Ext.Container',
	xtype: 'dial',

	config: {
		// The dial image should have a transparent border of tolerance pixels
		tolerance: 30, // The amount of space on either side of the dial band to count as touching the dial
		dialWidth: 20, // The number of pixels wide the dial band is
		theta: 0,
		lastAngle: null,
		rotatable: true,
	},

	initialize: function() {
		this.callParent();
	},

	onStart: function(event, element) {
		this.setLastAngle(null);
	},

	onMove: function(event, element) {
		var relLoc = this.getRelativePosition(event, element);
		var currentAngle = Math.atan2(-relLoc.x, relLoc.y) + Math.PI;
		console.log("--------------------");
		console.log("Angle " + currentAngle);
		console.log("Position " + relLoc);

		if (this.getLastAngle() === null) {
			this.setLastAngle(currentAngle);
		}

		var distance = Math.sqrt(Math.pow(relLoc.x, 2) + Math.pow(relLoc.y, 2));
		console.log("Distance " + distance);
		console.log("getInnerDiameter " + this.getInnerDiameter());
		console.log("getOuterDiameter " + this.getOuterDiameter());
		if(distance > this.getInnerDiameter()/2 && distance < this.getOuterDiameter()/2){
			if (this.getRotatable()){

				var deltaTheta = currentAngle - this.getLastAngle();
				console.log("Test" + deltaTheta);
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
	},

	getInnerDiameter: function() {
		return this.getDiameter() - this.getDialWidth() - this.getTolerance();
	},

	getOuterDiameter: function() {
		return this.getDiameter() + this.getTolerance();
	},

	getDiameter: function() {
		return Ext.get(this.getId()).getHeight() - this.getTolerance();
	}
})