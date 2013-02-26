Ext.define('UWCenterStack.view.Dial', {
	extend: 'Ext.Img',
	xtype: 'dial',

	config: {
		src: 'resources/icons/dial.png',
		diameter: 100,
		innerDiameter: 0,
		outerDiameter: Number.MAX_VALUE,
		theta: 0,
		lastAngle: null,
		rotatable: true,

		listeners: {
			touchstart: {
				element: 'element',
				fn: 'onStart'
			},
			touchmove: {
				element: 'element',
				fn: 'onMove'
			},
			touchend: {
				element: 'element',
				fn: 'onEnd'
			}
		}
	},

	initialize: function() {
		this.callParent();

		var diameter = this.getDiameter();
		this.setWidth(diameter);
		this.setHeight(diameter);
		this.setInnerDiameter((512 - 200)/512 * diameter);
		this.setOuterDiameter((512 - 40)/512 * diameter);
	},

	onStart: function(event, element) {
		this.setLastAngle(null);
		e = event;
		el = element;
	},

	onMove: function(event, element) {
		var relLoc = new Ext.util.Point(event.event.layerX - this.getWidth()/2, event.event.layerY-this.getHeight()/2);
		var currentAngle = Math.atan2(-relLoc.x, relLoc.y) + Math.PI;

		if (this.getLastAngle() === null) {
			this.setLastAngle(currentAngle);
		}

		var distance = Math.sqrt(Math.pow(relLoc.x, 2) + Math.pow(relLoc.y, 2));
		if(distance > this.getInnerDiameter()/2 && distance < this.getOuterDiameter()/2){
			if (this.getRotatable()){

				var deltaTheta = currentAngle - this.getLastAngle();

				if ((deltaTheta > 0 && this.getRotatable() !== 'left') || (deltaTheta < 0 && this.getRotatable() !== 'right')){
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
		this.fireEvent('dialrotate', this.getTheta(), this);
	},

	onEnd: function(event, element) {
		this.fireEvent('restore', this.getTheta(), this);
	},

	set: function() {
		this.element.dom.style.webkitTransform = 'rotate(' + this.getTheta()/Math.PI*180 + 'deg)';
	}
})