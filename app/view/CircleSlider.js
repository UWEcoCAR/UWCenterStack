Ext.define('UWCenterStack.view.CircleSlider', {
	extend: 'UWCenterStack.view.Dial',
	xtype: 'circleslider',

	config: {
		selected: false,
		selectable: true,

		items: [
			{
				xtype: 'container',
				cls: 'slider-background '
			},
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
		this.on('painted', this.setSliceClippings);
	},

	onStart: function(event, element){
		this.setLastAngle(null);
		var relLoc = this.getRelativePosition(event, element);

		var distance = Math.sqrt(Math.pow(relLoc.x, 2) + Math.pow(relLoc.y, 2));
		this.setSelected(distance >= this.getInnerDiameter()/2 && distance <= this.getOuterDiameter()/2);
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
			if (distance > this.getInnerDiameter()/2 && distance < this.getOuterDiameter()/2){
				this.setSlider(currentAngle/Math.PI*180);
				this.fireEvent('sliderchange', currentAngle/Math.PI*180, this);
			}
		}
	},

	setSlider: function(angle) {
		a = this;
		var slice1 = this.getItems().items[1].getItems().items[0]
		var slice2 = this.getItems().items[2].getItems().items[0]
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

	setSliceClippings: function() {
		var diameter = this.getOuterDiameter();

		var items = this.getItems().items;
		items[2].setStyle('clip:rect(0px,' + (diameter/2) + "px, " + (diameter) + "px, " + "0px);");
		items[1].getItems().items[0].setStyle('clip:rect(0px,' + (diameter/2) + "px, " + (diameter) + "px, " + "0px);");
		items[1].setStyle('clip:rect(0px,' + (diameter) + "px, " + (diameter) + "px, " + (diameter/2) + "px);");
		items[2].getItems().items[0].setStyle('clip:rect(0px,' + (diameter) + "px, " + (diameter) + "px, " + (diameter/2) + "px);");
	}
});