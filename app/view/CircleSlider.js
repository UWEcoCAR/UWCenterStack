Ext.define('feel-your-way.view.CircleSlider', {
	extend: 'Ext.Container',
	xtype: 'circleslider',

	config: {
		diameter: null,
		innerDiameter: null,
		outerDiameter: null,
		lastAngle: null,
		rotatable: true,
		selected: true,
		selectable: true,

		items: [
			{
				xtype: 'container',
				cls: 'front',
				items: [
					{
						xtype: 'container',
						cls: 'slice1',
					}
				]
			},
			{
				xtype: 'container',
				cls: 'back',
				items: [
					{
						xtype: 'container',
						cls: 'slice2',
					}
				]
			},
			{
				xtype: 'container',
				cls: 'slider-background '
			}
		],

		// listeners: {
		// 	touchstart: {
		// 		element: 'innerElement',
		// 		fn: 'onStart'
		// 	},
		// 	touchmove: {
		// 		element: 'innerElement',
		// 		fn: 'onMove',
		// 	},
		// 	touchend: {
		// 		element: 'innerElement',
		// 		fn: 'onStart'
		// 	}
		// }
	},

	initialize: function() {
		var diameter = this.getDiameter();
		this.setWidth(diameter);
		this.setHeight(diameter);
		this.setInnerDiameter((512 - 60 - 30)/512 * diameter);
		this.setOuterDiameter((512 - 2 + 30)/512 * diameter);
		var items = this.getItems().items;
		items[1].setStyle('clip:rect(0px,' + (diameter/2) + "px, " + (diameter) + "px, " + "0px);");
		items[0].getItems().items[0].setStyle('clip:rect(0px,' + (diameter/2) + "px, " + (diameter) + "px, " + "0px);");
		items[0].setStyle('clip:rect(0px,' + (diameter) + "px, " + (diameter) + "px, " + (diameter/2) + "px);");
		items[1].getItems().items[0].setStyle('clip:rect(0px,' + (diameter) + "px, " + (diameter) + "px, " + (diameter/2) + "px);");
	},

	onStart: function(event, element){
		this.setLastAngle(null);
		var relLoc = this.getRelativePosition(event, element);

		var distance = Math.sqrt(Math.pow(relLoc.x, 2) + Math.pow(relLoc.y, 2));
		this.setSelected(distance >= this.getInnerDiameter()/2 && distance <= this.getOuterDiameter()/2);
		console.log(this.getSelected());
		this.onMove(event, element);
	},

	onMove: function(event, element) {
		if(this.getSelected() && this.getSelectable()){
			var relLoc = this.getRelativePosition(event, element);
			var currentAngle = Math.atan2(-relLoc.x, relLoc.y) + Math.PI;

			if (this.getLastAngle() === null) {
				this.setLastAngle(currentAngle);
			}

			var distance = Math.sqrt(Math.pow(relLoc.x, 2) + Math.pow(relLoc.y, 2));
			if(distance > this.getInnerDiameter()/2 && distance < this.getOuterDiameter()/2){
				// if (this.getRotatable()){

				// 	var deltaTheta = currentAngle - this.getLastAngle();

				// 	if ((deltaTheta > 0 && this.getRotatable() !== 'left') || (deltaTheta < 0 && this.getRotatable() !== 'right')){
						
				// 	}
				// }
			}
			this.setLastAngle(currentAngle);
			this.setSelected(distance > this.getInnerDiameter()/2 && distance < this.getOuterDiameter()/2);
			this.setSlider(currentAngle/Math.PI*180);
			this.fireEvent('sliderchange', currentAngle/Math.PI*180, this);
		}
	},

	setSlider: function(angle) {
		a = this;
		var slice1 = this.getItems().items[0].getItems().items[0]
		var slice2 = this.getItems().items[1].getItems().items[0]
		if (angle%360 != 0){
			angle = angle%360;
		}

		if (angle <= 180) {
			slice1.setStyle('-webkit-transform:rotateZ(' + angle + 'deg);');
			slice2.setStyle('-webkit-transform:rotateZ(0deg);');
		} else {
			slice1.setStyle('-webkit-transform:rotateZ(180deg);');
			slice2.setStyle('-webkit-transform:rotateZ(' + (angle - 180) + 'deg);');
		}
	},

	getRelativePosition: function(event, element) {
		var el = Ext.get(element).findParent('.multidial');
		return new Ext.util.Point(event.pageX - el.offsetLeft - el.offsetWidth/2, event.pageY - el.offsetTop - el.offsetHeight/2);
	}
});