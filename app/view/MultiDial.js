Ext.define('feel-your-way.view.MultiDial', {
	extend: 'Ext.Container',
	xtype: 'multidial',

	config: {
		cls: 'multidial',
		innerCircleDiameter: null,
		outerCircleDiameter: null,
		top: 0,
		left: 0,

		innerSlider: null,
		outerSlider: null,
		dial: null,
		mode: 'dial', // or 'slider' 

		listeners: {
			touchstart: {
				element: 'element',
				fn: 'onStart'
			},
			touchmove: {
				element: 'element',
				fn: 'onMove',
			},
			touchend: {
				element: 'element',
				fn: 'onEnd'
			}
		}
	},

	constructor: function(config) {
		this.callParent(arguments);
		this.setWidth(config.outerCircleDiameter);
		this.setHeight(config.outerCircleDiameter);

		var dial = Ext.create('feel-your-way.view.Dial', {
			id: config.id + '-dial',
			cls: 'dial',
			diameter: config.outerCircleDiameter,
			top: 0,
			left: 0
		});

		var outerSlider = Ext.create('feel-your-way.view.CircleSlider',{
			id: config.id + '-outer-slider',
			cls: 'outer-slider slider',
			diameter: config.outerCircleDiameter,
			top: 0,
			left: 0,
		});

		var innerSlider = Ext.create('feel-your-way.view.CircleSlider',{
			id: config.id + '-inner-slider',
			cls: 'inner-slider slider',
			diameter: config.innerCircleDiameter,
			top: (config.outerCircleDiameter-config.innerCircleDiameter)/2,
			left: (config.outerCircleDiameter-config.innerCircleDiameter)/2,

		});
		innerSlider.setSlider(Ext.getCmp('audio').getVolume() * 360);

		this.setDial(dial);
		this.setOuterSlider(outerSlider);
		this.setInnerSlider(innerSlider);
		this.add([dial, outerSlider, innerSlider]);
		this.updateMode(this.getMode());
	},

	onStart: function(event, element) {
		if (this.getMode()=='dial') this.getDial().onStart(event, this.getDial().element);
		this.getInnerSlider().onStart(event, this.getInnerSlider().element);
		if (this.getMode() == 'slider') this.getOuterSlider().onStart(event, this.getOuterSlider().element);
	},

	onMove: function(event, element) {
		if (this.getMode()=='dial') this.getDial().onMove(event, this.getDial().element);
		this.getInnerSlider().onMove(event, this.getInnerSlider().element);
		if (this.getMode() == 'slider') this.getOuterSlider().onMove(event, this.getOuterSlider().element);
	},

	onEnd: function(event, element) {
		if (this.getMode()=='dial') this.getDial().onStart(event, this.getDial().element);
		this.getInnerSlider().onStart(event, this.getInnerSlider().element);
		if (this.getMode() == 'slider') this.getOuterSlider().onStart(event, this.getOuterSlider().element);
	},

	updateMode: function(mode) {
		if (this.getDial() !== null){
			if (mode == 'slider'){
				this.getDial().hide();
				this.getOuterSlider().show();
			} else if( mode == 'dial'){
				this.getDial().show();
				this.getOuterSlider().hide();
			}
		}
	}
});